import { parse, HTMLElement, TextNode } from 'node-html-parser';
import { minify } from 'html-minifier-terser'

export function searchKeyword(htmlString: string, keyword: string): string[] {
    const root = parse(htmlString);
    const results: string[] = [];

    // Traverse the nodes and collect text content that matches the keyword
    function traverse(node: HTMLElement | TextNode): void {
        if (node.nodeType === 3) { // Text node
            const textNode = node as TextNode;
            if (textNode.rawText.includes(keyword)) {
                results.push(textNode.rawText.trim());
            }
        } else if (node.nodeType === 1) { // Element node
            const elementNode = node as HTMLElement;
            elementNode.childNodes.forEach(childNode => traverse(childNode as HTMLElement | TextNode));
        }
    }

    traverse(root as HTMLElement | TextNode);
    return results;
}

export function extractAttributeValues(htmlString: string, tagName: string, attributeName: string, nonEmptyText: boolean = false): string[] {
    const root = parse(htmlString);
    const values: string[] = [];

    // Extract specified attribute from specified tag
    root.getElementsByTagName(tagName).forEach(element => {
        const attributeValue = element.getAttribute(attributeName);

        if (attributeValue) {
            if (nonEmptyText) {
                const elementText = attributeValue.trim();
                if (elementText !== '') {
                    values.push(attributeValue);
                }
            } else {
                values.push(attributeValue);
            }
        }
    });
    return values;
}

export const MinifHtml = async (html: string) => {
    const cleanedHTML = cleanHTML(html);
    const minifiedHTML = await minify(cleanedHTML, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: true
    });

    return minifiedHTML;
}

export const cleanHTML = (html: string) => {
    const root = parse(html);

    // Remove all <link> elements with rel="preload"
    root.querySelectorAll('link[rel="preload"]').forEach(link => link.remove());

    // Remove all <script> elements
    root.querySelectorAll('script').forEach(script => script.remove());

    return root.toString();
}