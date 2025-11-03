const nisabEmas = 85; // Nisab emas dalam gram
        const haulMin = 1;     // Haul minimum dalam tahun

        document.getElementById('aktifEmas').addEventListener('change', function() {
            const inputEmas = document.getElementById('jumlahEmas');
            const isChecked = this.checked;

            if (isChecked) {
                // Jika diceklis, input diaktifkan dan nilai kembali ke nilai yang ada
                inputEmas.disabled = false;
                if (inputEmas.value === '0') {
                    inputEmas.value = ''; // Kosongkan jika sebelumnya 0 akibat uncheck
                }
            } else {
                // Jika tidak diceklis, input dinonaktifkan dan nilainya diatur ke 0
                inputEmas.value = 0;
                inputEmas.disabled = true;
            }
        });

        function hitungZakat() {
            const jumlahEmas = parseFloat(document.getElementById('jumlahEmas').value) || 0;
            const lamaKepemilikan = parseFloat(document.getElementById('lamaKepemilikan').value) || 0;

            // Logika Zakat: Wajib Zakat jika (Emas >= 85) AND (Haul >= 1)
            const wajibZakat = (jumlahEmas >= nisabEmas) && (lamaKepemilikan >= haulMin);

            const hasilZakatElement = document.getElementById('hasilZakat');
            const hukumLogikaElement = document.getElementById('hukumLogika');
            const argumenLogisElement = document.getElementById('argumenLogis');

            if (wajibZakat) {
                hasilZakatElement.textContent = "Wajib Zakat";
            } else {
                hasilZakatElement.textContent = "Tidak Wajib Zakat";
            }

            // Teks Hukum Logika
            hukumLogikaElement.innerHTML = const penjelasanLogika = `
    <p>Hukum logika pada perhitungan zakat di atas yaitu hukum <strong>Konjungsi ($\land$)</strong>.</p>
    <p>Perhitungan ini menggunakan operator <strong>AND</strong> (<code>&&</code>) yang merupakan Konjungsi.</p>
    <p>
        Konjungsi ($p \\land q$) bernilai <strong>BENAR</strong> (Wajib Zakat) hanya jika 
        <strong>kedua proposisi</strong> ($p$: Emas $\\geq 85$ gram) dan ($q$: Haul $\\geq 1$ tahun) 
        bernilai <strong>BENAR</strong> secara bersamaan.
    </p>
`;
                
            
            // Teks Argumen Logis
            if (wajibZakat) {
                argumenLogisElement.textContent = `Saat ini Anda diwajibkan untuk mengeluarkan zakat karena Anda mempunyai simpanan ${jumlahEmas} gram emas selama ${lamaKepemilikan} tahun.`;
            } else {
                let alasan = [];
                const emasCukup = jumlahEmas >= nisabEmas;
                const haulCukup = lamaKepemilikan >= haulMin;

                if (!emasCukup) {
                    alasan.push(`jumlah emas (${jumlahEmas} gram) belum mencapai nisab (${nisabEmas} gram)`);
                }
                if (!haulCukup) {
                    alasan.push(`lama kepemilikan (${lamaKepemilikan} tahun) belum mencapai haul (${haulMin} tahun)`);
                }
                
                const alasanTeks = alasan.join(' dan ');
                argumenLogisElement.textContent = `Saat ini Anda belum diwajibkan untuk mengeluarkan zakat karena ${alasanTeks}.`;
            }
        }

        // Panggil hitungZakat sekali saat halaman dimuat untuk inisialisasi teks
        document.addEventListener('DOMContentLoaded', hitungZakat);
