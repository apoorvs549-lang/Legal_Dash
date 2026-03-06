import Document from '../models/document-model.js';

/**
 * Create a new document record in PostgreSQL with metadata only.
 * @param {Object} fields – { clientName, caseType, description, version, fileName, fileCount }
 * @returns {Promise<Document>}
 */
export async function createDocument(fields) {
    const { clientName, caseType, description, version, fileName, fileCount } = fields;

    if (!clientName) throw new Error('clientName is required');
    if (!caseType) throw new Error('caseType is required');
    if (!version) throw new Error('version is required');

    const doc = await Document.create({
        clientName,
        caseType,
        description: description || null,
        version,
        fileName: fileName || null,
        fileCount: fileCount || 0,
    });

    return doc;
}

/**
 * Get all documents ordered by newest first.
 */
export async function getAllDocuments() {
    return Document.findAll({ order: [['createdAt', 'DESC']] });
}


/**
 * Get a single document by UUID.
 */
export async function getDocumentById(id) {
    const doc = await Document.findByPk(id);
    if (!doc) throw new Error(`Document with id ${id} not found`);
    return doc;
}
