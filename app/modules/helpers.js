module.exports = {
  internalize: (string) => {
    return string.toLowerCase().replace(new RegExp('[^a-zA-Z0-9_]+', 'g'), '_');
  }
}
