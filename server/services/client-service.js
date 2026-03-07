import Client from '../models/client-model.js';

/**
 * Create a new client record.
 * @param {Object} fields – { name, caseType, status }
 * @returns {Promise<Client>}
 */
export async function createClient(fields) {
    const { name, email, phone, dob, address, caseType, caseDescription, incidentDate, opposingParty, status } = fields;

    if (!name) throw new Error('Client name is required');
    if (!caseType) throw new Error('Case type is required');

    const client = await Client.create({
        name,
        email,
        phone,
        dob: dob || null,
        address,
        caseType,
        caseDescription,
        incidentDate: incidentDate || null,
        opposingParty,
        status: status || 'Active',
        dateAdded: new Date(),
    });

    return client;
}

/**
 * Get all clients ordered by dateAdded DESC.
 * @returns {Promise<Client[]>}
 */
export async function getAllClients() {
    return Client.findAll({ order: [['dateAdded', 'DESC']] });
}

/**
 * Get a single client by UUID.
 * @param {string} id
 * @returns {Promise<Client>}
 */
export async function getClientById(id) {
    const client = await Client.findByPk(id);
    if (!client) throw new Error(`Client with id ${id} not found`);
    return client;
}

/**
 * Mark a client's case as taken.
 * @param {string} id
 * @returns {Promise<Client>}
 */
export async function takeClientCase(id) {
    const client = await getClientById(id);
    client.isTaken = true;
    await client.save();
    return client;
}
