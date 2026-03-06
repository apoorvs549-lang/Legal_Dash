import * as documentService from '../services/document-service.js';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import util from 'util';

/**
 * POST /api/documents/upload
 * Accepts multipart/form-data with metadata fields and file.
 */
async function uploadDocument(request, reply) {
    try {
        const parts = request.parts();
        const fields = {};
        const savedFiles = [];

        // Define uploads directory
        const uploadsDir = path.join(__dirname, '..', 'uploads');

        for await (const part of parts) {
            if (part.type === 'file') {
                // Determine a unique filename
                const uniqueFileName = `${Date.now()}-${part.filename}`;
                const filePath = path.join(uploadsDir, uniqueFileName);

                // Save the file to disk
                await pipeline(part.file, fs.createWriteStream(filePath));

                savedFiles.push({
                    originalName: part.filename,
                    path: `/uploads/${uniqueFileName}`
                });
            } else {
                // Text fields
                fields[part.fieldname] = part.value;
            }
        }

        // Validate required fields
        if (!fields.clientName || !fields.caseType || !fields.version) {
            return reply.code(400).send({
                success: false,
                message: 'clientName, caseType, and version are required fields',
            });
        }

        const fileNames = savedFiles.map(f => f.originalName).join(', ');

        const savedDocument = await documentService.createDocument({
            clientName: fields.clientName,
            caseType: fields.caseType,
            description: fields.description || '',
            version: fields.version,
            fileName: fileNames || '',
            fileCount: savedFiles.length || 0,
        });

        // Optionally, you might want to save the actual paths (URLs) of the files
        // Let's just append them to description for now or if you had a fileUrls array in DB

        return reply.code(201).send({
            success: true,
            message: 'Document uploaded successfully',
            data: {
                ...savedDocument.toJSON(),
                files: savedFiles // returning uploaded paths so frontend knows where they are
            },
        });
    } catch (error) {
        request.log.error(error);

        if (
            error.message.includes('already exists') ||
            error.message.includes('is required')
        ) {
            return reply.code(400).send({
                success: false,
                message: error.message,
            });
        }

        return reply.code(500).send({
            success: false,
            message: 'An internal server error occurred',
            error: error.message,
        });
    }
}

/**
 * GET /api/documents
 */
async function getAllDocuments(request, reply) {
    try {
        const documents = await documentService.getAllDocuments();
        return reply.send({
            success: true,
            count: documents.length,
            data: documents,
        });
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to fetch documents',
            error: error.message,
        });
    }
}

/**
 * GET /api/documents/:id
 */
async function getDocumentById(request, reply) {
    try {
        const { id } = request.params;
        const document = await documentService.getDocumentById(id);
        return reply.send({
            success: true,
            data: document,
        });
    } catch (error) {
        if (error.message.includes('not found')) {
            return reply.code(404).send({
                success: false,
                message: error.message,
            });
        }

        request.log.error(error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to fetch document',
            error: error.message,
        });
    }
}

export { uploadDocument, getAllDocuments, getDocumentById };