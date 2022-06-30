import AssetsStore from './asssetStore';
import { generateGoogleTag } from './generateGoogleTag'

export default (req, res) => {
    res.stream.end(`
        ${generateGoogleTag(true)}
        ${AssetsStore.bodyString}
        </body>
        </html>
    `);
};
