// shared/utils/loadScript.js
export function loadScript(src) {
    return new Promise((resolve, reject) => {
        // Avoid loading the same script twice
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

        document.head.appendChild(script);
    });
}