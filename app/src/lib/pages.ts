// import { MDXProps } from 'mdx/types';
// import { notFound } from 'next/navigation';
// import fs from 'node:fs';
// import { join } from 'node:path';
// import { JSX } from 'react';

// const contentDirectory = join(process.cwd(), 'content');

// export const getAllPagesSlug = () => {
//     // const walkSync = (directory: string, filelist: string[] = []) => {
//     //     for (const file of fs.readdirSync(directory)) {
//     //         if (directory === contentDirectory && file === 'index.mdx')
//     //             continue;

//     //         // console.log({ file, directory });
//     //         filelist = fs.statSync(join(directory, file)).isDirectory()
//     //             ? walkSync(join(directory, file), filelist)
//     //             : filelist.concat(
//     //                   join(directory, file)
//     //                       .replace(/\.mdx$/, '')
//     //                       // if filename is index.mdx, then we want to remove the index part
//     //                       .replace(/\/index$/, '')
//     //               );
//     //     }

//     //     return filelist;
//     // };

//     // return walkSync(contentDirectory).map((file) =>
//     //     file.replace(`${contentDirectory}/`, '')
//     // );
//     return [];
// };

// export const getAllPages = async () => {
//     const slugs = await ();

//     return await Promise.all(slugs.map((slug) => getPageBySlug(slug)));
// };

const hello = 'foo';

export { hello };
