import { useEffect, useState } from 'react'
import './dropBox.css'
import { useDropzone } from 'react-dropzone'
import Button from '@mui/material/Button';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const DropBox = () => {
    const [files, setFiles] = useState([])
    const [uploadedFiles, setUploadedFiles] = useState([])
    const onDrop = ((acceptedFiles) => {
        setFiles(previousFiles => [
            ...previousFiles,
            ...acceptedFiles.map((file) =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
            )
        ])
    })
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxSize: 1024 * 1024 * 2,
        onDrop
    })


    const handleSubmit = async (file) => {
        if (!file) return
        if (uploadedFiles.includes(file)) {
            return
        }
        const fileName = file.name
        try {
            const storeageRef = ref(storage, `Documents/${fileName}`)
            await uploadBytes(storeageRef, file)
        } catch (error) {
            console.log(error);
        }
        setUploadedFiles((prevFile) => [...prevFile, file])

    }
    const componentDidMount = ((num) => {
        const date = new Date(num);
        const exactDate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
        return exactDate
    })

    const downloadFile = async (fileName) => {
        try {
            const pdfRef = ref(storage, `Documents/${fileName}`);
            const url = await getDownloadURL(pdfRef);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(objectURL);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    }

    return (
        <form >
            <div
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <div className='uploadButton-container'>
                    <span className='upload-main-button'>Upload Files</span>
                </div>
            </div>
            {files.length ?
                (<TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead >
                            <TableRow >
                                <TableCell sx={{ fontSize: "2.3vh", fontWeight: "500" }}>File name</TableCell>
                                <TableCell sx={{ fontSize: "2.3vh", fontWeight: "500" }} align="right">File size &nbsp;(kb)</TableCell>
                                <TableCell sx={{ fontSize: "2.3vh", fontWeight: "500" }} align="right">Created at</TableCell>
                                <TableCell sx={{ fontSize: "2.3vh", fontWeight: "500" }} align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {files.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.size / 1000}</TableCell>
                                    <TableCell align="right">{componentDidMount(row.lastModified)}</TableCell>
                                    <TableCell align="right"> <Button variant="contained" onClick={() => handleSubmit(row)}>Save</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>) :
                (<></>)

            }
            <section>
                {
                    uploadedFiles.length > 0 ? (
                        <div className='uploadedFiles-main-container'>
                            <p className='uploadedFiles-heading'>Saved Files</p>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead  >
                                        <TableRow >
                                            <TableCell sx={{ fontSize: "2.3vh", fontWeight: "500" }} >File name</TableCell>
                                            <TableCell sx={{ fontSize: "2.3vh", fontWeight: "500" }} align="right">File size &nbsp;(kb)</TableCell>
                                            <TableCell sx={{ fontSize: "2.3vh", fontWeight: "500" }} align="right">Created at</TableCell>
                                            <TableCell sx={{ fontSize: "2.3vh", fontWeight: "500" }} align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {uploadedFiles.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.size / 1000}</TableCell>
                                                <TableCell align="right">{componentDidMount(row.lastModified)}</TableCell>
                                                <TableCell align="right"> <Button variant="contained" onClick={() => downloadFile(row.name)}>Download</Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </section>
        </form >
    )
}

export default DropBox
