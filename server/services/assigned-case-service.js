import AssignedCase from '../models/assigned-case-model.js';

/**
 * Create a new assigned case record.
 * @param {Object} fields – { name, caseType, status }
 */
export async function createAssignedCase(fields) {
    const { name, caseType, status } = fields;

    if (!name) throw new Error('name is required');
    if (!caseType) throw new Error('caseType is required');
    if (!status) throw new Error('status is required');

    const assignedCase = await AssignedCase.create({ name, caseType, status });
    return assignedCase;
}

/**
 * Get all assigned cases, newest first.
 */
export async function getAllAssignedCases() {
    return AssignedCase.findAll({ order: [['createdAt', 'DESC']] });
}

/**
 * Get a single assigned case by UUID.
 */
export async function getAssignedCaseById(id) {
    const assignedCase = await AssignedCase.findByPk(id);
    if (!assignedCase) throw new Error(`Case with id ${id} not found`);
    return assignedCase;
}

/**
 * Delete a single assigned case by UUID.
 */
export async function deleteAssignedCase(id) {
    const assignedCase = await getAssignedCaseById(id);
    await assignedCase.destroy();
    return true;
}
