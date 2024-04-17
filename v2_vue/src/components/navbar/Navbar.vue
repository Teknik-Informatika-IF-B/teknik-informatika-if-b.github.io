<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="https://i.ibb.co/dG1TtgY/logo.png" height="50" class="d-inline-block align-text-top" loading="lazy">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link active" role="button" onclick="SchedulinatorViewer.navigation.to('today')">Jadwal Hari Ini</a></li>
                    <li class="nav-item"><a class="nav-link" role="button" onclick="SchedulinatorViewer.navigation.to('all')">Lihat Semua Jadwal</a></li>
                    <li class="nav-item"><a class="nav-link" role="button" onclick="SchedulinatorViewer.navigation.to('editor')">Editor</a></li>
                </ul>
                <form class="d-flex mb-2 d-lg-none d-xl-none" onsubmit="return SchedulinatorViewer.handleDateInput(this)">
                    <div class="input-group"><input type="date" class="form-control classDate" name="date" required><button class="btn btn-success" type="submit">Lihat</button></div>
                </form>
                <form class="d-flex d-lg-none d-xl-none" onsubmit="return SchedulinatorViewer.handleScheduleCode(this)">
                    <div class="input-group has-validation">
                        <input type="text" name="code" class="form-control" placeholder="Masukkan kode jadwal" value="" required><button class="btn btn-success" type="submit">Terapkan</button>
                        <div class="invalid-feedback inputCodeFeedback" style="max-width:300px">Kode jadwal tidak ditemukan atau tidak valid.</div>
                    </div>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        
    }
</script>