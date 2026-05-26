package com.resua.observations.infrastructure.services;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Comparator;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LocalStorageServiceTest {

    private LocalStorageService localStorageService;

    @BeforeEach
    void setUp() {
        localStorageService = new LocalStorageService();
        ReflectionTestUtils.setField(localStorageService, "contextPath", "/observations-ms");
        ReflectionTestUtils.setField(localStorageService, "serverPort", "8082");
    }

    @AfterEach
    void tearDown() throws IOException {
        Path uploads = Paths.get("uploads/observations/99");
        if (Files.exists(uploads)) {
            try (Stream<Path> walk = Files.walk(uploads)) {
                walk.sorted(Comparator.reverseOrder()).forEach(path -> {
                    try {
                        Files.deleteIfExists(path);
                    } catch (IOException ignored) {
                    }
                });
            }
        }
    }

    @Test
    void uploadImage_shouldSaveFileAndReturnUrl() throws IOException {
        byte[] content = "imagen-prueba".getBytes();
        String base64 = "data:image/png;base64," + Base64.getEncoder().encodeToString(content);

        String url = localStorageService.uploadImage(base64, 99L, 1L, 1);

        assertTrue(url.contains("/api/images/99/1/"));
        assertTrue(url.startsWith("http://localhost:8082/observations-ms"));

        String fileName = url.substring(url.lastIndexOf('/') + 1);
        byte[] stored = localStorageService.getImage(99L, 1L, fileName);
        assertArrayEquals(content, stored);
    }

    @Test
    void getImage_whenFileDoesNotExist_shouldThrowIOException() {
        assertThrows(IOException.class, () -> localStorageService.getImage(99L, 1L, "no-existe.png"));
    }
}
