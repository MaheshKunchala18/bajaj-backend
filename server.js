import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const getHighestLowercaseAlphabet = (arr) => {
  const lowercaseAlphabets = arr.filter((char) => /^[a-z]$/.test(char));
  if (lowercaseAlphabets.length === 0) return [];
  return [lowercaseAlphabets.sort().pop()];
};


app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid data format' });
  }

  const numbers = data.filter((item) => !isNaN(item)).map(Number);
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
  const highestLowercaseAlphabet = getHighestLowercaseAlphabet(data);

  const user_id = 'mahesh_kunchala_15042003';
  const email = 'mahesh_kunchala@srmap.edu.in';
  const roll_number = 'AP21110011635';

  let fileValid = false;
  let fileMimeType = '';
  let fileSizeKb = 0;

  if (file_b64) {
    const buffer = Buffer.from(file_b64, 'base64');
    fileSizeKb = buffer.length / 1024;
    fileMimeType = 'image/png';
    fileValid = true;
  }

  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb.toFixed(2),
  });
});


app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
