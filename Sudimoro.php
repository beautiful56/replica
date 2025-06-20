<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <title>Sistem Informasi Pertanahan</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

    <style>
        /* Pastikan div peta memiliki tinggi agar terlihat */
        #mapid {
            height: 600px; /* Atur tinggi agar peta terlihat */
            width: 100%;
            /* Tambahkan style lain yang mungkin Anda inginkan dari CSS Anda */
        }
    </style>
    </head>
<body>

    <h1>Peta Bidang Tanah</h1>

    <div id="mapid"></div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <script src="lib/L.Geoserver.js" type="text/javascript"></script>

    <script type="text/javascript">
        // Inisialisasi peta
        // Gunakan 'mapid' sesuai dengan ID div peta Anda
        var map = L.map('mapid').setView([-7.568448, 110.643845], 14); // Koordinat dari kode Anda

        // Tambahkan OpenStreetMap sebagai base layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Tambahkan WMS Layer dari Geoserver Anda
        // Pastikan URL Geoserver dan nama layer benar
        var wmsLayer = L.Geoserver.wms("http://localhost:8080/geoserver/Kelompok_B2/wms", {
            layers: "Kelompok_B2:PolaRuang_Sudimoro" // Pastikan nama layer benar (case-sensitive)
        }).addTo(map);

        // Tambahkan Legend Layer dari Geoserver Anda
        // Pastikan URL Geoserver dan nama layer benar
        var layerLegend = L.Geoserver.legend("http://localhost:8080/geoserver/Kelompok_B2/wms", {
            layers: "Legenda" // Pastikan nama layer legenda benar (case-sensitive)
        }).addTo(map);
    </script>

</body>
</html>