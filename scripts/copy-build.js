const fs = require('fs');
const path = require('path');

// Criar diretório dist se não existir (limpar se já existir)
const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  // Limpar diretório existente
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

console.log('Created dist directory');

// Verificar se existe .next/standalone (modo standalone)
const standaloneDir = path.join(process.cwd(), '.next', 'standalone');
if (fs.existsSync(standaloneDir)) {
  console.log('Copying standalone build...');
  // Copiar todo o conteúdo do standalone para dist
  copyRecursiveSync(standaloneDir, distDir);
  
  // Copiar public e .next/static para dist (standalone não inclui automaticamente)
  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    console.log('Copying public directory...');
    copyRecursiveSync(publicDir, path.join(distDir, 'public'));
  }
  
  const staticDir = path.join(process.cwd(), '.next', 'static');
  if (fs.existsSync(staticDir)) {
    console.log('Copying static files...');
    if (!fs.existsSync(path.join(distDir, '.next'))) {
      fs.mkdirSync(path.join(distDir, '.next'), { recursive: true });
    }
    copyRecursiveSync(staticDir, path.join(distDir, '.next', 'static'));
  }
  
  // Atualizar package.json no dist para usar server.js
  const distPackageJson = path.join(distDir, 'package.json');
  if (fs.existsSync(distPackageJson)) {
    console.log('Updating package.json start script...');
    const packageJsonContent = JSON.parse(fs.readFileSync(distPackageJson, 'utf8'));
    packageJsonContent.scripts = {
      ...packageJsonContent.scripts,
      start: 'node server.js'
    };
    fs.writeFileSync(distPackageJson, JSON.stringify(packageJsonContent, null, 2));
  }
} else {
  // Se não usar standalone, copiar .next completo
  console.log('Copying .next directory...');
  const nextDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    copyRecursiveSync(nextDir, path.join(distDir, '.next'));
  }
  
  // Copiar public
  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    console.log('Copying public directory...');
    copyRecursiveSync(publicDir, path.join(distDir, 'public'));
  }
  
  // Copiar package.json
  const packageJson = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJson)) {
    console.log('Copying package.json...');
    fs.copyFileSync(packageJson, path.join(distDir, 'package.json'));
  }
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  if (!exists) {
    console.warn(`Source does not exist: ${src}`);
    return;
  }
  
  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const files = fs.readdirSync(src);
    files.forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    // Garantir que o diretório de destino existe
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

console.log('✓ Build files copied to dist directory successfully');
console.log(`✓ Dist directory contents: ${fs.readdirSync(distDir).join(', ')}`);