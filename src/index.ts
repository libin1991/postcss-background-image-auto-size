import path from 'path';
import sizeOf from 'image-size';
import { plugin } from 'postcss';
import { hasBackground, getImageURL, imageSupported, getMatchedImage } from './helpers';
const PLUGIN_NAME = 'auto-image-size';

export default plugin(PLUGIN_NAME, () => {
    return root => {
        const images: ImageType[] = extractImages(root);

        root.walkDecls(/^background(-image)?$/, (declare: any) => {
            const rule = declare.parent;
            const ruleString = rule.toString();

            if (!hasBackground(ruleString)) return false;

            const [, URL] = getImageURL(ruleString);
            const image = getMatchedImage(images, URL)

            if (!image) return false;

            const { width, height } = sizeOf(image.path);
            
            declare.cloneAfter({
                type: 'decl',
                prop: 'width',
                value: `${width}px`,
            }).cloneAfter({
                type: 'decl',
                prop: 'height',
                value: `${height}px`,
            });
        });
    };
});


function extractImages(root: any): ImageType[] {
    const images: ImageType[] = [];

    root.walkRules((rule: any) => {
        const styleFilePath = root.source.input.file;
        const ruleString = rule.toString();
        const image: ImageType = {
            path: null,
            URL: null,
            originURL: null,
        };

        if (hasBackground(ruleString)) {
            const [originURL, URL] = getImageURL(ruleString);

            image.URL = URL;
            image.originURL = originURL;

            if (imageSupported(image.URL)) {
                image.path = path.resolve(path.dirname(styleFilePath), image.URL);
                images.push(image);
            } else {
                console.log(`image not supported`);
            }
        }
    });

    return images;
}

