import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';

async function testUpload() {
    try {
        console.log("Creating test file...");
        fs.writeFileSync('test-doc.txt', 'This is a test document.');

        const form = new FormData();
        form.append('clientName', 'Test Client');
        form.append('caseType', 'Test Case');
        form.append('version', '1.0');
        form.append('description', 'Testing upload from script');
        form.append('file', fs.createReadStream('test-doc.txt'));

        console.log("Sending POST request to http://13.63.65.240:3000/api/documents/upload...");
        const res = await fetch('http://13.63.65.240:3000/api/documents/upload', {
            method: 'POST',
            body: form
        });

        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Response:", data);

        // cleanup
        fs.unlinkSync('test-doc.txt');
    } catch (e) {
        console.error("Error:", e);
    }
}

testUpload();
