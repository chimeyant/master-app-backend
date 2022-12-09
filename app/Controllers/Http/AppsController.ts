import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AppInfo from 'App/Models/AppInfo'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"


export default class AppsController {
  async index({}:HttpContextContract){
    const appinfo = await AppInfo.query().first()

    const logourl = await Drive.getSignedUrl("images/apps/"+ appinfo?.app_logo)

   const data = {
    app_name: appinfo?.app_name,
    app_ver: appinfo?.app_ver,
    app_desc: appinfo?.app_desc,
    app_logo: appinfo?.app_logo == 'logo.png'? "/images/logo-banten.png" :Env.get("BASE_URL")+ logourl  ,
    app_theme: {
      mode:appinfo?.app_theme,
      color:appinfo?.app_color
    },
    app_background: Env.get("BASE_URL")+ "/images/apps/"+   appinfo?.app_background,
    app_nav : Env.get("BASE_URL")+ "/images/apps/"+   appinfo?.app_nav,
    app_url: appinfo?.app_url,
    app_company: appinfo?.app_company,
    app_slogan: appinfo?.app_slogan,
    app_address: appinfo?.app_address,
    app_wa: appinfo?.app_wa
   }

   return data;
  }

  async menus({auth}: HttpContextContract){
    const user = await auth.user

    const authent = await user?.authent

    let menus :{} = [];

    if(authent == 'superadmin'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/backend/dashboard",
        },

        { title: "Master Data", type: "subheader", route: "/" },
        {
          title: "Informasi Aplikasi",
          icon: "settings",
          route: "/backend/master-app-info",
          type: "item",
        },

        { title: "Halaman Depan", type: "subheader", route: "/" },
        {
          title: "Gallery Slider",
          icon: "mdi-animation",
          route: "/backend/master-slider",
          type: "item",
        },


        { title: "Utility", type: "subheader", route: "/" },

        {
          title: "Akun Aplikasi",
          icon: "engineering",
          route: "/backend/user",
          type: "item",
        },
        {
          title: "Profil Pengguna",
          icon: "accessibility",
          route: "/backend/profil-akun",
          type: "item",
        },
        {
          title: "Ganti Kata Sandi",
          icon: "vpn_key",
          route: "/backend/chngpwd",
          type: "item",
        },
        {
          title: "Manajemen Fitur",
          icon: "mdi-widgets",
          route: "/backend/utility-manajemen-fitur-administrator",
          type: "item",
        },
        {
          title: "Update History",
          icon: "mdi-update",
          route: "/backend/utility-update-history",
          type: "item",
        },
      ];
      return menus;
    }

    if(authent == 'administrator'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/backend/dashboard",
        },

        { title: "Master Data", type: "subheader", route: "/" },

        { title: "Halaman Depan", type: "subheader", route: "/" },
        {
          title: "Slider",
          icon: "image",
          route: "/backend/halaman-depan-slider",
          type: "item",
        },


        { title: "Utility", type: "subheader", route: "/" },

        {
          title: "Akun Aplikasi",
          icon: "engineering",
          route: "/backend/user",
          type: "item",
        },
        {
          title: "Profil Pengguna",
          icon: "accessibility",
          route: "/backend/profil-akun",
          type: "item",
        },
        {
          title: "Ganti Kata Sandi",
          icon: "vpn_key",
          route: "/backend/chngpwd",
          type: "item",
        },
        {
          title: "Manajemen Fitur",
          icon: "mdi-widgets",
          route: "/backend/utility-manajemen-fitur-administrator",
          type: "item",
        },
        {
          title: "Update History",
          icon: "mdi-update",
          route: "/backend/utility-update-history",
          type: "item",
        },
      ];
      return menus;
    }

    /**
     * Menu User
     */
     if(authent == 'peserta'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/backend/peserta-dashboard",
        },
        { title: "Utility", type: "subheader", route: "/" },
        {
          title: "Profil Pengguna",
          icon: "accessibility",
          route: "/backend/profil-akun",
          type: "item",
        },
        {
          title: "Ganti Kata Sandi",
          icon: "vpn_key",
          route: "/backend/chngpwd",
          type: "item",
        },
        {
          title: "Manajemen Fitur",
          icon: "mdi-widgets",
          route: "/backend/utility-manajemen-fitur",
          type: "item",
        },

      ];
      return menus;
    }

    if(authent == 'io'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/backend/dashboard",
        },


        { title: "Event", type: "subheader", route: "/" },
        {
          title: "Daftar Peserta",
          icon: "mdi-account-multiple-outline",
          route: "/backend/event-peserta-eo",
          type: "item",
        },
        {
          title: "Scan Barcode",
          icon: "mdi-barcode-scan",
          route: "/backend/event-scan-barcode",
          type: "item",
        },
        {
          title: "Daftar Kehadiran",
          icon: "mdi-shield-check",
          route: "/backend/event-presensi",
          type: "item",
        },

        { title: "Utility", type: "subheader", route: "/" },


        {
          title: "Profil Pengguna",
          icon: "accessibility",
          route: "/backend/profil-akun",
          type: "item",
        },
        {
          title: "Ganti Kata Sandi",
          icon: "vpn_key",
          route: "/backend/chngpwd",
          type: "item",
        },
        {
          title: "Manajemen Fitur",
          icon: "mdi-widgets",
          route: "/backend/utility-manajemen-fitur-administrator",
          type: "item",
        },
        {
          title: "Update History",
          icon: "mdi-update",
          route: "/backend/utility-update-history",
          type: "item",
        },
      ];
      return menus;
    }

  }
}
