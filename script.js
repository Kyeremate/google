async function deleteFiles() {
  // Check for browser support
  if (!window.showDirectoryPicker) {
      // Fallback to input type file
      const filePicker = document.getElementById('file-picker');
      filePicker.addEventListener('change', (e) => {
          const files = e.target.files;
          // Process selected files
          for (const file of files) {
              if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                  // Delete file logic (fallback)
                  document.getElementById('status').innerText = `Deleted ${file.name}`;
              }
          }
      });
  } else {
      try {
          // Use File System Access API
          const dirHandle = await window.showDirectoryPicker();
          document.getElementById('status').innerText = 'Directory permission granted';

          // Get file handles
          const files = await dirHandle.values();

          // Delete files
          for await (const file of files) {
              if (file.kind === 'file' && (
                  // Picture file types
                  file.name.endsWith('.jpg') ||
                  file.name.endsWith('.jpeg') ||
                  file.name.endsWith('.png') ||
                  file.name.endsWith('.gif') ||
                  file.name.endsWith('.bmp') ||
                  file.name.endsWith('.svg') ||
                  // Video file types
                  file.name.endsWith('.mp4') ||
                  file.name.endsWith('.mkv') ||
                  file.name.endsWith('.avi') ||
                  file.name.endsWith('.mov') ||
                  file.name.endsWith('.wmv') ||
                  file.name.endsWith('.flv') ||
                  file.name.endsWith('.mpg') ||
                  file.name.endsWith('.mpeg')
              )) {
                  await dirHandle.removeEntry(file.name, { recursive: true });
                  document.getElementById('status').innerText = `Deleted ${file.name}`;
              }
          }
      } catch (error) {
          document.getElementById('status').innerText = `Error: ${error.message}`;
      }
  }
}

// Call deleteFiles function on button click
document.getElementById('delete-files').addEventListener('click', deleteFiles);
