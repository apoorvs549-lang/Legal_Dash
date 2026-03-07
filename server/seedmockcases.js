import { Sequelize, DataTypes } from 'sequelize';

// 1. Configure Sequelize Connection
const sequelize = new Sequelize("database_dash", "postgres", "apoorv123", {
  host: "localhost",
  port: 5433,
  dialect: "postgres",
  logging: false,
});

// 2. Define exactly what your app defines for Client and AssignedCase to safely use Sequelize's `create`
const Client = sequelize.define('Client', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING },
    caseType: { type: DataTypes.STRING, field: 'case_type' },
    status: { type: DataTypes.STRING, defaultValue: 'Active' },
    dateAdded: { type: DataTypes.DATEONLY, field: 'date_added', defaultValue: DataTypes.NOW },
}, { tableName: 'clients_registry', timestamps: true, underscored: true });

const AssignedCase = sequelize.define('AssignedCase', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING },
    caseType: { type: DataTypes.STRING, field: 'case_type' },
    status: { type: DataTypes.STRING },
}, { tableName: 'assigned_cases', timestamps: true, underscored: true });

const INITIAL_CLIENTS = [
    { name: 'Sarah Mitchell', caseType: 'Civil', status: 'Action Taken', dateAdded: '2026-03-01' },
    { name: 'Robert Chen', caseType: 'Criminal', status: 'Assigned', dateAdded: '2026-03-02' },
    { name: 'TechCorp Industries', caseType: 'Corporate', status: 'Final Review', dateAdded: '2026-03-03' },
    { name: 'Amara Osei', caseType: 'Family', status: 'Submitted', dateAdded: '2026-03-04' },
    { name: 'Marcus Reeves', caseType: 'Immigration', status: 'Closed', dateAdded: '2026-03-05' },
];

async function seedDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Connected to DB...");

        for (const data of INITIAL_CLIENTS) {
            // Add them to the overarching Client Registry pool
            await Client.create({
                name: data.name,
                caseType: data.caseType,
                // Client registry uses Active/Review/Closed. Let's map it cleanly if it's deeply in progress.
                status: data.status === 'Closed' ? 'Closed' : (data.status === 'Submitted' ? 'Active' : 'Review'),
                dateAdded: data.dateAdded,
            });

            // Add them explicitly to the Activity Feed taken cases
            await AssignedCase.create({
                name: data.name,
                caseType: data.caseType,
                status: data.status,
            });
        }
        
        console.log("Successfully seeded mock cases into BOTH Client Registry & Activity Feed databases!");

    } catch (err) {
        console.error("Error seeding:", err);
    } finally {
        await sequelize.close();
    }
}

seedDatabase();
