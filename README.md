<h1>React Project for Beginners Repository</h1>

<p>Welcome to the React Project for Beginners Repository! This is a special place for beginners who are passionate about learning and contributing to open-source projects using React JS.</p>
<p>It's Hacktoberfest currently!</p>

<h3>NOTE #1: PLEASE CHECK YOUR PROJECT CAREFULLY. IT SHOULD BE ERROR-FREE. YOUR PROJECT WILL BE REVIEWED. IF THE REVIEWER FINDS ANY ERROR, YOUR REQUEST WILL BE MARKED AS "INVALID".</h3>

<h3>NOTE #2: DON'T FORGET TO LIST YOUR PROJECT IN THE <code>projects.js</code> FILE IN THE ROOT FOLDER OF THE REPO. YOU CAN ALSO ADD A DEMO LINK OF YOUR PROJECT (IF ANY).</h3>

<h3>NOTE #3: Please read the <a href="https://github.com/ianshulx/React-projects-for-beginners/blob/main/Repo_Size_Guidelines">Repo-Size Management Guidelines</a>.</h3>

<h3>Description</h3>
<p>This repository serves as a platform for React Project for Beginners participants who are on their journey to mastering React JS and want to contribute during Hacktoberfest. It's a place where you can share your mini-projects, learn from others, and contribute to the growth of the open-source community.</p>
<p>Whether you've built a simple calculator, a to-do list, or a weather app, your contributions are welcomed here. The main goal of this repository is to encourage learning and collaboration among developers who are new to React and open-source contributions.</p>

<h3>What is Hacktoberfest?</h3>
<p>Hacktoberfest is a month-long celebration of open-source software run by DigitalOcean. It's open to everyone in our global community. Whether you’re a developer, a student learning to code, an event host, or a company of any size, you can help drive the growth of open-source and make positive contributions to an ever-growing community. All backgrounds and skill levels are encouraged to complete the challenge.</p>
<p><a href="https://hacktoberfest.com/">Click Here for Hacktoberfest Information</a></p>

<h3>Process of Contribution</h3>
<ol>
    <li><strong>Fork</strong>: Fork this GitHub Repo to your own GitHub account.</li>
    <li><strong>Clone</strong>: Clone the forked repo (the repo present on your account) to your local machine (Reminder: make sure you are in the directory where you want the repository stored).</li>

    <pre>
    <code>git clone https://github.com/ianshulx/React-projects-for-beginners</code>
    </pre>

    <li>Create a <strong>New Branch</strong>:</li>

    <pre>
    <code>git checkout -b my-new-branch</code>
    </pre>

    <li><strong>Make Changes</strong>: Create a new branch and commit your changes on that branch.</li>

    <li><strong>ADD</strong> and <strong>COMMIT</strong>:</li>
    <ul>
        <li>Add your changes:</li>
        <pre><code>git add .</code></pre>
        
        <li>Commit your changes (Reminder: make sure your commit message includes necessary details to understand the change).</li>
        <pre><code>git commit -m "Relevant message"</code></pre>
    </ul>

    <li><strong>Push</strong>: After all changes are committed, push your changes to your remote repo.</li>
    <pre><code>git push origin my-new-branch</code></pre>

    <li><strong>PR</strong>: After pushing changes, raise a PR from your remote repo to this repo's <code>dev</code> branch (Reminder: make sure you title your PR appropriately to reflect the major topic of your request).</li>
</ol>

<p>By participating in this repository, you will not only be contributing to open source but also improving your skills in React JS. Let's make learning React fun and interactive during this Hacktoberfest!</p>
<p>Happy Coding and Happy Hacktoberfest!</p>

<h3>Contribution Guidelines</h3>
<p>Please make sure to follow the contribution guidelines before making a pull request. Quality contributions are what make the open-source community an amazing place to learn, inspire, and create.</p>
<p>Find the full list of guidelines in the <code>CONTRIBUTING.md</code> file.</p>

<h3>Repo-Size Management Guidelines</h3>
<p>This repository hosts multiple projects, and to ensure smooth performance and efficient management, the following guidelines must be followed:</p>

<h4>1. Project Size Limitation</h4>
<ul>
    <li>Each individual project folder should <strong>not exceed 15 MB</strong>.</li>
    <li>If a project requires more space due to additional assets or data, consider refactoring the code or storing external files in a separate location (such as cloud storage or GitHub Pages).</li>
</ul>

<h4>2. File Organization</h4>
<ul>
    <li>Projects should be organized in clearly labeled folders under the root directory.</li>
    <li>Keep the folder structure simple, e.g., <code>Project_name1/</code>, <code>Project_name2/</code>, etc.</li>
</ul>

<h4>3. Avoid Large Binary Files</h4>
<ul>
    <li>Do <strong>not</strong> commit large binary files (e.g., videos, high-resolution images, compiled executables) directly to the repository.</li>
    <li>Use <a href="https://git-lfs.github.com/">Git LFS (Large File Storage)</a> for files larger than <strong>100 MB</strong> or consider storing large assets outside the repository and linking to them.</li>
</ul>

<h4>4. Minimize External Libraries</h4>
<ul>
    <li>Minimize the use of heavy third-party libraries or external dependencies.</li>
    <li>Use a <code>.gitignore</code> file to exclude unnecessary or autogenerated files (e.g., <code>node_modules/</code>, <code>build/</code>, etc.).</li>
</ul>

<h4>5. Regular Cleanup</h4>
<ul>
    <li>Perform regular cleanup of unnecessary files (e.g., logs, temporary files).</li>
    <li>Remove outdated or unused code, assets, or projects from the repository.</li>
</ul>

<h4>6. Compression of Assets</h4>
<ul>
    <li><strong>Image Compression</strong>: Use tools like <a href="https://tinypng.com/">TinyPNG</a>, <a href="https://imageoptim.com/">ImageOptim</a>, or <a href="https://squoosh.app/">Squoosh</a> to compress images (PNG, JPEG, etc.) before committing them.</li>
    <li><strong>For Web Images</strong>: Use appropriate formats like <strong>WebP</strong> to significantly reduce size without compromising quality.</li>
    <li><strong>SVG Usage</strong>: Use <strong>SVG</strong> files whenever possible for vector graphics, as they are scalable and lightweight.</li>
    <li>Compress other assets like PDFs and audio files using lossless compression tools before adding them to the repository to reduce file size.</li>
</ul>

<h4>7. Optimize Code for Performance</h4>
<ul>
    <li><strong>Bundle and Minify</strong>: Ensure your project setup uses tools like Webpack or Vite to bundle and minify JavaScript and CSS files. This reduces file sizes and speeds up load times.</li>
    <li><strong>Tree Shaking</strong>: When using third-party libraries, make sure to only import the necessary parts (tree-shaking) to avoid bundling unused code.</li>
    <li>For example, prefer <code>import { Button } from 'library'</code> instead of <code>import * as Library from 'library'</code>.</li>
</ul>

<h4>8. Versioning and History Management</h4>
<ul>
    <li>Keep commit history clean by avoiding frequent commits of unnecessary files.</li>
    <li>Use meaningful and concise commit messages.</li>
    <li>If a project becomes too large over time, consider splitting it into a separate repository.</li>
</ul>

<h4>9. Contributions</h4>
<ul>
    <li>For contributors, please adhere to the project size limits. Large contributions should be discussed through an issue or a pull request.</li>
    <li>Ensure all contributions are optimized for size and performance before submitting them.</li>
</ul>

<h3>Code of Conduct</h3>
<p>This project adheres to the Hacktoberfest Values and the <a href="https://www.contributor-covenant.org/">Contributor Covenant Code of Conduct</a>. By participating, you are expected to uphold this code.</p>

<h3>License</h3>
<p>This repository is licensed under the MIT License.</p>

<h4>The MIT License Do's and Don'ts Summary:</h4>

<strong>Do's:</strong>
<ul>
    <li>Use the code in commercial applications: For example, a company can create a proprietary piece of software that includes all or part of the original open-source code, then charge money for that software.</li>
    <li>Modify the code: In other words,
