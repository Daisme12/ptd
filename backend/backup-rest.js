import fs from "fs";
import path from "path";

// Helper to flatten Firestore REST API document formats into clean JSON
function flattenFields(fields) {
  if (!fields) return {};
  const flat = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value.stringValue !== undefined) {
      flat[key] = value.stringValue;
    } else if (value.integerValue !== undefined) {
      flat[key] = parseInt(value.integerValue, 10);
    } else if (value.doubleValue !== undefined) {
      flat[key] = parseFloat(value.doubleValue);
    } else if (value.booleanValue !== undefined) {
      flat[key] = value.booleanValue;
    } else if (value.arrayValue !== undefined) {
      flat[key] = (value.arrayValue.values || []).map(val => {
        if (val.mapValue) return flattenFields(val.mapValue.fields);
        return val.stringValue || val.integerValue || val.booleanValue || val;
      });
    } else if (value.mapValue !== undefined) {
      flat[key] = flattenFields(value.mapValue.fields);
    } else if (value.nullValue !== undefined) {
      flat[key] = null;
    } else if (value.timestampValue !== undefined) {
      flat[key] = value.timestampValue;
    } else {
      flat[key] = value;
    }
  }
  return flat;
}

async function backup() {
  const collections = ["categories", "products", "documents", "certificates"];
  const projectId = "thinhphongdo-58625";
  const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;
  
  const backupData = {};

  try {
    console.log("Starting Firestore Backup via REST API...");

    for (const col of collections) {
      console.log(`Fetching collection: ${col}...`);
      const res = await fetch(`${baseUrl}/${col}`);
      if (!res.ok) {
        console.error(`Failed to fetch collection ${col}: ${res.statusText}`);
        continue;
      }
      const data = await res.json();
      
      backupData[col] = (data.documents || []).map(doc => {
        const id = doc.name.split("/").pop();
        return {
          id,
          ...flattenFields(doc.fields)
        };
      });
      console.log(`Successfully backed up ${backupData[col].length} documents from ${col}`);
    }

    // Fetch settings/general individually
    console.log("Fetching settings/general...");
    const settingsRes = await fetch(`${baseUrl}/settings/general`);
    if (settingsRes.ok) {
      const settingsDoc = await settingsRes.json();
      backupData["settings"] = {
        id: "general",
        ...flattenFields(settingsDoc.fields)
      };
      console.log("Successfully backed up settings/general");
    } else {
      console.error("Failed to fetch settings/general");
    }

    const backupDir = path.join(process.cwd(), "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const fileName = `firestore_backup_${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    const filePath = path.join(backupDir, fileName);

    fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2), "utf8");
    console.log(`\n🎉 Backup completed! File saved at:\n${filePath}`);
  } catch (error) {
    console.error("Backup script failed:", error);
  }
}

backup();
