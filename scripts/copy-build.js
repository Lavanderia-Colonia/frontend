const fs = require('fs');
const path = require('path');

const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

console.log('Created dist directory');

const standaloneDir = path.join(process.cwd(), '.next', 'standalone');
if (fs.existsSync(standaloneDir)) {
    console.log('Copying standalone build...');
    copyRecursiveSync(standaloneDir, distDir);

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
} else {
    console.log('Copying .next directory...');
    const nextDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextDir)) {
        copyRecursiveSync(nextDir, path.join(distDir, '.next'));
    }

    const publicDir = path.join(process.cwd(), 'public');
    if (fs.existsSync(publicDir)) {
        console.log('Copying public directory...');
        copyRecursiveSync(publicDir, path.join(distDir, 'public'));
    }

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
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(src, dest);
    }
}

console.log('✓ Build files copied to dist directory successfully');
console.log(`✓ Dist directory contents: ${fs.readdirSync(distDir).join(', ')}`);