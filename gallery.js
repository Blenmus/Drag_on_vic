// gallery.js

const app = createApp({
  data() {
    return {
      images: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/image3.jpg",
        // Add more image URLs as needed
      ],
    };
  },
});

app.mount("#gallery");
