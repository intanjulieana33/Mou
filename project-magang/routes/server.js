const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); //menerima permintaan dari domain lain
app.use(express.json()); //menerima data dalam format JSON

//dummy data untuk dokumen
let documents = [
    {
        id: 1,
        nomor: "001/2024",
        nama: "Kerjasama Pendidikan",
        lamaKerjasama: "3 Tahun",
        jenis: "Promosi",
        status: "Aktif",
    },
];

//endpoint untuk semua dokumen
app.get('/api/documents', (req, res) => {
    res.json(documents);
});

//endpoint untk tambah dokumen
app.post('/api/documents', (req, res) => {
    const newDocument = req.body;
    documents.push(newDocument);
    res.status(201).json(newDocument);
});

//endpoint update dokumen
app.put('/api/documents/:id', (req, res) => {
    const { id } = req.params;
    const { nomor, nama, lamaKerjasama, jenis, status } = req.body;

    let doc = documents.find(d => d.id === parseInt(id));
    if (doc) {
        doc.nomor = nomor || doc.nomor;
        doc.nama = nama || doc.nama;
        doc.lamaKerjasama = lamaKerjasama || doc.lamaKerjasama;
        doc.jenis = jenis || doc.jenis;
        doc.status = status || doc.status;
        res.json(doc);
    } else {
        res.status(404).json({ message: 'Dokumen tidak ditemukan' });
    }
});

//endpoint hapus dokumen
app.delete('/api/documents/:id', (req, res) => {
    const { id } = req.params;
    documents = documents.filter(doc => doc.id !== parseInt(id));
    res.status(204).send();
});

//run server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
