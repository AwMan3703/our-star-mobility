const readmeContainer = document.getElementById("readme-container")

async function loadReadme() {
    const res = await fetch("https://raw.githubusercontent.com/AwMan3703/our-star-mobility/refs/heads/main/README.md");
    const text = await res.text();
    // @ts-ignore
    readmeContainer.innerHTML = marked.parse(text);
    console.log("README.md embedded in the disclaimer box")
}

if (!!readmeContainer) loadReadme();