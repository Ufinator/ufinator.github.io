function fetchprojects() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {
        if (xhttp.status === 200) {
            let jsonres = JSON.parse(xhttp.responseText);
            jsonres = Object.values(jsonres);
            jsonres.forEach((element) => {
                const title = element['title'];
                const creationdate = new Date(element['creationdate'] * 1000);
                const description = element['description'];
                const img_url = element['img_url'];
                const status = getStatusText(element['status']);
                const project_url = element['project_url'];

                const block = document.createElement('div');
                block.classList.add('project');
                const titleBlock = document.createElement('h1');
                titleBlock.textContent = title;
                const creationdateBlock = document.createElement('h4');
                creationdateBlock.textContent = `Started on: ${creationdate.getUTCDate()}.${creationdate.getUTCMonth() + 1}.${creationdate.getUTCFullYear()}`;
                const statusBlock = document.createElement('h4');
                statusBlock.textContent = `Status: ${status}`;
                const descriptionBlock = document.createElement('p');
                descriptionBlock.textContent = description;
                const imageBlock = document.createElement('img');
                imageBlock.src = img_url;
                const linkBlock = document.createElement('a');
                linkBlock.href = project_url;
                linkBlock.target = "_blank";

                linkBlock.appendChild(block);
                block.appendChild(titleBlock);
                block.appendChild(creationdateBlock);
                block.appendChild(statusBlock);
                block.appendChild(descriptionBlock);
                block.appendChild(imageBlock);

                const projectsBlock = document.getElementById('projects');
                projectsBlock.appendChild(linkBlock);
            });
        };
    };
    xhttp.open('GET', '/api/get/projects');
    xhttp.send();
};

function getStatusText(statusCode) {
    if (statusCode === 1) {
        return 'Activ 🟢';
    } else if (statusCode === 2) {
        return 'On Pause 🟡';
    } else if (statusCode === 3) {
        return 'Archived 🟠';
    } else {
        return 'Unknown 🔴';
    };
};

fetchprojects();