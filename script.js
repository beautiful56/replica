document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM content loaded. Initializing map...");

    // Inisialisasi peta
    // Pastikan koordinat pusat dan zoom level sesuai dengan wilayah Banten
    // Contoh: Serang, Banten [-6.1214, 106.1264] atau [-6.0, 106.0] untuk area lebih luas
    var map = L.map('mapid').setView([-6.0, 106.0], 9); // Sesuaikan koordinat dan zoom
    console.log("Map initialized.");

    // Tambahkan OpenStreetMap tiles sebagai base layer
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    console.log("OpenStreetMap tiles added.");

    var baseLayers = {
        "OpenStreetMap": osm
    };
    var overlays = {};

    // Muat data GeoJSON
    // PASTIKAN NAMA FILE DAN PATH INI BENAR SESUAI DENGAN LOKASI FILE GEOJSON ANDA
    // Contoh: 'data/batas_kecamatan_banten.geojson'
    const geoJsonFilePath = 'data/batas_kecamatan_banten.geojson'; // <--- GANTI INI DENGAN NAMA FILE ANDA
    console.log("Attempting to load GeoJSON from:", geoJsonFilePath);

    fetch(geoJsonFilePath)
        .then(response => {
            console.log("GeoJSON fetch response status:", response.status);
            if (!response.ok) {
                // Memberikan pesan error yang lebih jelas jika file tidak ditemukan (404) atau ada masalah lain
                throw new Error('HTTP error! status: ' + response.status + ' - Check if file exists at ' + geoJsonFilePath);
            }
            return response.json();
        })
        .then(data => {
            console.log("GeoJSON data loaded:", data);
            if (data.features && data.features.length > 0) {
                var geoJsonLayer = L.geoJSON(data, {
                    style: function(feature) {
                        // Anda bisa menyesuaikan style berdasarkan properti data GeoJSON
                        // Contoh: warna acak untuk setiap fitur
                        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                        return {
                            color: randomColor,     // Warna garis batas
                            weight: 2,              // Ketebalan garis
                            opacity: 0.7,           // Transparansi garis
                            fillColor: randomColor, // Warna isi poligon
                            fillOpacity: 0.2        // Transparansi isi poligon
                        };
                    },
                    onEachFeature: function(feature, layer) {
                        // Tampilkan popup saat diklik dengan properti dari GeoJSON
                        // Anda perlu tahu nama properti di data GeoJSON Anda
                        // Contoh: 'NAMOBJ', 'nama', 'kabupaten', 'provinsi'
                        if (feature.properties) {
                            let popupContent = "<b>Info Area:</b><br>";
                            // Iterasi semua properti dan tampilkan di popup
                            for (const key in feature.properties) {
                                // Lewati properti dengan nilai null atau undefined
                                if (feature.properties[key] !== null && feature.properties[key] !== undefined) {
                                    popupContent += `<b>${key}:</b> ${feature.properties[key]}<br>`;
                                }
                            }
                            layer.bindPopup(popupContent);
                        }
                    }
                }); // Hapus `.addTo(map)` di sini jika ingin layer bisa di-toggle

                // Tambahkan layer GeoJSON ke objek overlays
                overlays["batas_kecamatan_banten.geojson"] = geoJsonLayer; // Anda bisa ganti nama ini di layer control
                console.log("GeoJSON layer added to overlays.");

            } else {
                console.warn("GeoJSON file loaded, but it contains no features or is empty.");
                alert("GeoJSON file loaded, but it contains no features to display. Check the GeoJSON content.");
            }

            // Inisialisasi Layer Control setelah semua base dan overlay layers terdefinisi
            // Ini akan membuat tombol di pojok kanan atas peta untuk mengaktifkan/menonaktifkan layer
            L.control.layers(baseLayers, overlays).addTo(map);
            console.log("Layer control added.");

            // Opsional: Jika Anda ingin layer GeoJSON langsung terlihat saat pertama kali dimuat
            // geoJsonLayer.addTo(map);

        })
        .catch(error => {
            console.error('Gagal memuat atau memproses data GeoJSON:', error);
            alert('Gagal memuat data peta. Silakan cek konsol browser (tekan F12) untuk detail error: ' + error.message);
        });

    // Tambahkan interaksi dasar (contoh)
    map.on('click', function(e) {
        // L.popup()
        //     .setLatLng(e.latlng)
        //     .setContent("Anda mengklik di: " + e.latlng.toString())
        //     .openOn(map);
    });

});