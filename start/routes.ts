/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return "API SERVICE SERVER"
})


Route.get("sliders", "HalamanDepan/SlidersController.publish")



Route.group(()=>{
  Route.group(()=>{
    Route.post("token","Auth/LoginController.login")
    Route.post("register","Auth/RegistersController.register");
  }).prefix("auth")

  Route.get("info","AppsController.index")
  Route.get("menus","AppsController.menus").middleware('auth')
  Route.get("user-info","Utility/UsersController.userInfo").middleware(['auth'])

  //Route public lokasi
  Route.get("home","HalamanDepan/HomeController.index")
  Route.get("berita","HalamanDepan/BeritasController.index")
  Route.get("daftar-lokasi","MasterData/LokasisController.getlokasi")
  Route.get('show-lokasi/:id', "MasterData/LokasisController.show")
  Route.get("daftar-hotel","HalamanDepan/HotelsController.index")
  Route.get("show-hotel/:id","HalamanDepan/HotelsController.show")
  Route.get("daftar-wisata","HalamanDepan/WisatasController.index")
  Route.get("show-wisata/:id","HalamanDepan/WisatasController.show")
  Route.get('gallery-foto',"HalamanDepan/FotosController.index")
  Route.get('latest-video',"HalamanDepan/VideosController.showLatestVideo")
  Route.get("show-video", "HalamanDepan/VideosController.showVideos")
  Route.get("show-media","HalamanDepan/DocumentsController.showMedia");
  Route.get("registrasi-berhasil/:uuid","Auth/RegistersController.registrasiBerhasil")

  //route media
  Route.post("media", "MediaController.store").middleware(["auth"]);
  Route.get("dashboard","DashboardController.index").middleware(['auth'])

  //route superadmin
  Route.group(()=>{
    Route.group(()=>{
      Route.resource("app-info","MasterData/AppInfosController")
      Route.resource('provinces',"MasterData/ProvincesController")
      Route.resource('regencies/:province_id',"MasterData/RegenciesController")
      Route.resource("pegawai/:kunker","MasterData/PegawaisController")
      Route.post('singkronisasi-pegawai',"MasterData/PegawaisController.singkronisasi")
    }).prefix("master-data").middleware(['auth'])

  }).prefix("superadmin")

  //route combo

  //Route bidang bangrir
  Route.group(()=>{
    Route.resource('pengajuan',"Operator/PengajuansController")
    Route.post("pengajuan-store-bulk","Operator/PengajuansController.bulkstore")
    Route.resource("kegiatans","Operator/KegiatansController")

  }).prefix("operator").middleware(['auth'])

  Route.group(()=>{

    Route.resource('daftar-peserta/:kegiatan_uuid',"BidangBangrir/KegiatanPesertasController")
    Route.group(()=>{
      Route.post("daftar-calon-peserta","Operator/PengajuansController.combo")
    }).prefix('combo')
  }).prefix('bidang-bangrir').middleware(['auth'])




  //route bidang data
  Route.group(()=>{
    Route.resource("pengajuan","BidangData/PengajuansController").as("bidang-data-pengajuan")
    Route.resource('verifikasi/:pengajuan_uuid', "BidangData/VerifikasisController")
  }).prefix("bidang-data").middleware(['auth'])

  //Route Bidang Renatur
  Route.group(()=>{
    Route.resource('pengajuan',"BidangRenatur/PengajuansController").as("bidang-renatur-pengajuan")
    Route.resource('verifikasi/:pengajuan_uuid',"BidangRenatur/VerfikasisController").as("bidang-renatur-pengajuan-verifikasi")
  }).prefix("bidang-renatur").middleware(['auth'])



  //route data combo
  Route.group(()=>{
    //combo wilayah
    Route.post('unitkerja',"MasterData/RefUnkerjasController.combo")
  }).prefix('combo')

  //Route Data Talenta
  Route.group(()=>{
    Route.resource('data-pegawai/:kunit',"Data/PegawaisController")
    Route.resource('riw-skp/:nip', "Data/RiwayatSkpsController")
  }).prefix('data').middleware(['auth'])

  //route utility
  Route.group(()=>{
    //Route manajemen pengguna
    Route.resource("users","Utility/UsersController")
    Route.post("update-profil","Utility/UsersController.updateProfil")
    Route.post("change-pwd","Utility/UsersController.changePwd")

    //Route manajemen fitur administrator
    Route.resource("fiturs","Utility/FitursController")
    Route.post("fiturs-set-progress","Utility/FitursController.setprogress")
    Route.post("fiturs-set-selesai","Utility/FitursController.setselesai")

    //Route manajemen fitur userr
    Route.resource("manajemen-fiturs","Utility/FiturUsersController")

    //Route Update History
    Route.resource("updates","Utility/UpdateHistoriesController")

  }).prefix('utility').middleware(['auth'])

  Route.group(()=>{
    Route.resource("sliders","HalamanDepan/SlidersController")
    Route.resource("foto","HalamanDepan/FotosController")
    Route.resource("video", "HalamanDepan/VideosController")
    Route.resource("document","HalamanDepan/DocumentsController")
  }).prefix("halaman-depan").middleware(['auth'])

}).prefix("api")

