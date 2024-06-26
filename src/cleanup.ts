import fs from 'fs';
import path from 'path';

async function deleteDirectories(mainDir: string): Promise<void> {
  const dirEntries = await fs.promises.readdir(mainDir, {
    withFileTypes: true,
  });

  for (const entry of dirEntries) {
    const dirPath = path.join(mainDir, entry.name);

    if (entry.isDirectory()) {
      if (entry.isDirectory()) {
        if (
          !entry.name.includes('-Icons_') &&
          (entry.name.includes('_16') ||
            entry.name.includes('16') ||
            entry.name.includes('_32') ||
            entry.name.includes('32') ||
            entry.name.includes('_64') ||
            entry.name.includes('64') ||
            entry.name.includes('_48_Dark'))
        ) {
          await fs.promises.rmdir(dirPath, { recursive: true });
          console.info(`Deleted directory: ${dirPath}`);
        } else {
          await deleteDirectories(dirPath);
        }
      }
    }
  }
}

async function deleteNonSvgFiles(mainDir: string): Promise<void> {
  const dirEntries = await fs.promises.readdir(mainDir, {
    withFileTypes: true,
  });

  for (const entry of dirEntries) {
    const entryPath = path.join(mainDir, entry.name);

    if (entry.isDirectory()) {
      await deleteNonSvgFiles(entryPath);
    } else {
      const ext = path.extname(entryPath).toLowerCase();
      if (ext !== '.svg') {
        await fs.promises.unlink(entryPath);
        console.log(`Deleted file: ${entryPath}`);
      }
    }
  }
}

async function renameFiles(mainDir: string): Promise<void> {
  const dirEntries = await fs.promises.readdir(mainDir, {
    withFileTypes: true,
  });

  for (const entry of dirEntries) {
    const entryPath = path.join(mainDir, entry.name);
    const ext = path.extname(entryPath);
    const baseName = path.basename(entryPath, ext);
    const newName =
      baseName.replace(
        /^Arch_|_48|32|Arch-Category_|Res_|_Light|-|_|&| |\./g,
        '',
      ) + ext;

    if (entry.isDirectory()) {
      await renameFiles(entryPath);
    } else {
      const newEntryPath = path.join(mainDir, newName);
      await fs.promises.rename(entryPath, newEntryPath);
      console.log(`Renamed file: ${entryPath} to ${newEntryPath}`);
    }
  }
}

async function copySvgFilesToIconsDirectory(mainDir: string): Promise<void> {
  const iconsDir = path.join(process.cwd(), 'svg');

  // Create the icons directory if it doesn't exist
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
  }

  const dirEntries = await fs.promises.readdir(mainDir, {
    withFileTypes: true,
  });

  for (const entry of dirEntries) {
    const entryPath = path.join(mainDir, entry.name);

    let categoryDir = iconsDir; // Default to the main icons directory

    if (entryPath.includes('Architecture-Group-Icons')) {
      categoryDir = path.join(iconsDir, 'architecture-group');
    } else if (entryPath.includes('Architecture-Service-Icons')) {
      categoryDir = path.join(iconsDir, 'architecture-service');
    } else if (entryPath.includes('Category-Icons')) {
      categoryDir = path.join(iconsDir, 'category');
    } else if (entryPath.includes('Resource-Icons')) {
      categoryDir = path.join(iconsDir, 'resource');
    }

    if (entry.isDirectory()) {
      await copySvgFilesToIconsDirectory(entryPath);
    } else if (path.extname(entryPath).toLowerCase() === '.svg') {
      const targetPath = path.join(categoryDir, entry.name.replace('32', ''));
      await fs.promises.mkdir(categoryDir, { recursive: true }); // Create category directory if it doesn't exist
      await fs.promises.copyFile(entryPath, targetPath);
      console.log(`Copied file: ${entryPath} to ${targetPath}`);
    }
  }
}

(async () => {
  const directoryPath = path.join(process.cwd(), 'aws-icons');

  try {
    await deleteDirectories(directoryPath);
    console.log('Deletion completed.');

    await deleteNonSvgFiles(directoryPath);
    console.log('Deletion completed.');

    await renameFiles(directoryPath);
    console.log('Renaming completed.');

    await copySvgFilesToIconsDirectory(directoryPath);
    console.log('Copying completed.');
  } catch (error) {
    console.error('Error:', error);
  }
})();
