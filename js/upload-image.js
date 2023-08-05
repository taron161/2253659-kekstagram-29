const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const getImage = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

export { getImage };
