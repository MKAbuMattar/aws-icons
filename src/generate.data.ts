import fs from 'fs';
import path from 'path';
import { RecursiveDirectory, recursiveDirectory } from 'recursive-directory';

(async () => {
  const files: RecursiveDirectory = (await recursiveDirectory(
    './aws-icons',
    true,
  )) as RecursiveDirectory;

  type Data = {
    name: string;
    icon: string;
    importIcon: ImportIcon;
    categorys: string[];
  };

  type CDN = {
    jsdelivr: string;
    unpkg: string;
  };

  type NPM = {
    npm: string;
  };

  type ImportIcon = {
    CDN: CDN;
    NPM: NPM;
  };

  const data: Data[] = [];
  let name = '';
  let icon = '';
  let importIcon: ImportIcon;
  let categorys: string[] = [];

  let obj: Data;
  let cdn: CDN;
  let npm: NPM;

  let jsdelivr = '';
  let unpkg = '';

  let prefix = '';

  files.forEach((file) => {
    const { fullpath, filename } = file;

    if (fullpath.includes('Architecture-Service-Icons')) {
      prefix = 'Architecture';
    } else if (fullpath.includes('Category-Icons')) {
      prefix = 'Category';
    } else if (fullpath.includes('Resource-Icons')) {
      prefix = 'Resource';
    }

    name = `${prefix} ${filename
      .replace(/([A-Z]+)(?=[A-Z][a-z0-9])/g, (match) =>
        match.length > 1 ? match.charAt(0) + match.slice(1) + ' ' : match,
      )
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace('.svg', '')
      .replaceAll('Io T', 'IoT ')
      .replace('AP Is', 'APIs')
      .replace('HTTP 2', 'HTTP2 ')
      .replace('S3', 'S3 ')
      .replace('FSxfor', 'FSx for')
      .replace('RA 3', 'RA3')
      .replace('EC2', 'EC2 ')
      .replace('Lo Ra WAN', 'LoRaWAN')
      .trim()}`;

    icon = `${prefix}${filename}`;

    jsdelivr = `https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/${icon}`;
    unpkg = `https://unpkg.com/aws-icons@latest/icons/${icon}`;

    cdn = {
      jsdelivr,
      unpkg,
    };

    npm = {
      npm: `aws-icons/icons/${icon}`,
    };

    importIcon = {
      CDN: cdn,
      NPM: npm,
    };

    if (fullpath.includes('Architecture-Service-Icons')) {
      categorys.push('Architecture Service');
    } else if (fullpath.includes('Category-Icons')) {
      categorys.push('Category');
    } else if (fullpath.includes('Resource-Icons')) {
      categorys.push('Resource');
    }

    if (fullpath.includes('Arch_')) {
      categorys.push(
        fullpath.split('Arch_')[1].split('/')[0].replace(/-/g, ' ').trim(),
      );
      if (
        fullpath.split('Arch_')[1].split('/')[0].replace(/-/g, ' ').trim() ===
        'Internet of Things'
      ) {
        categorys.push('IoT');
      }
    } else if (fullpath.includes('Res_')) {
      categorys.push(
        fullpath.split('Res_')[1].split('/')[0].replace(/-/g, ' ').trim(),
      );
    } else if (fullpath.includes('Arch-')) {
      categorys.push(`${name}`);
    }

    if (icon.toLowerCase().includes('DatabaseMigrationService'.toLowerCase())) {
      categorys.push('DMS');
    }

    obj = {
      name: name,
      icon: icon,
      importIcon: importIcon,
      categorys: categorys,
    };

    categorys = [];

    data.push(obj);
  });

  data.sort((a, b) => a.categorys[1].localeCompare(b.categorys[1]));

  data.sort((a, b) => a.categorys[0].localeCompare(b.categorys[0]));

  fs.writeFileSync(
    path.resolve(__dirname, 'build.config.json'),
    JSON.stringify(
      {
        data,
      },
      null,
      2,
    ),
  );
})();
