// document-renderer.js
function renderDocumentYears() {
    var documentYearsContainer = document.getElementById('documentYears');
    clearChildren(documentYearsContainer);

    saebDocuments.forEach(function(yearData) {
        var yearBlock = createElement('div', { className: 'document-year' });
        var yearTitle = createElement('h3', null, 'SAEB ' + yearData.year);
        yearBlock.appendChild(yearTitle);

        var list = createElement('ul');
        yearData.items.forEach(function(item) {
            var listItem = createElement('li');
            var link = createElement('a', { href: item.url }, item.title);
            listItem.appendChild(link);
            list.appendChild(listItem);
        });
        yearBlock.appendChild(list);
        documentYearsContainer.appendChild(yearBlock);
    });
}

function initDocumentUpload() {
    var uploadArea = document.getElementById('uploadArea');
    var fileInput = document.getElementById('fileInput');
    var documentsList = document.getElementById('documentsList');
    var documents = [];

    function formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        var k = 1024;
        var sizes = ['B', 'KB', 'MB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    function renderDocuments() {
        clearChildren(documentsList);
        if (documents.length === 0) {
            documentsList.innerHTML = '<p class="documents-empty">Nenhum documento adicionado ainda.</p>';
            return;
        }
        documents.forEach(function(doc) {
            var item = createElement('div', { className: 'doc-item' });
            item.innerHTML = '<span class="doc-item-name">📄 ' + doc.name + ' (' + doc.size + ')</span><button class="doc-remove" type="button">Remover</button>';
            item.querySelector('.doc-remove').addEventListener('click', function() {
                documents = documents.filter(function(entry) {
                    return entry.id !== doc.id;
                });
                renderDocuments();
            });
            documentsList.appendChild(item);
        });
    }

    function handleFiles(files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type) || file.name.match(/\.(pdf|docx|txt|xls|xlsx)$/i)) {
                documents.push({ id: Date.now() + i, name: file.name, size: formatBytes(file.size) });
            }
        }
        renderDocuments();
    }

    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.background = '#e8f4ff';
    });

    uploadArea.addEventListener('dragleave', function() {
        uploadArea.style.background = '#f8fbff';
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.background = '#f8fbff';
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', function() {
        handleFiles(fileInput.files);
    });

    renderDocuments();
}
