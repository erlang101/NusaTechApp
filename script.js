// ============================================================
// KONFIGURASI SUPABASE CLIENT (PT NUSATECH DIGITAL INDONESIA)
// ============================================================
const SUPABASE_URL = "https://gpnpdmwihkubkkziadpe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbnBkbXdpaGt1YmtremlhZHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4NDc5MzksImV4cCI6MjEwNTQyMzkzOX0.pManmCcU3QWvzbmF12yDcADPIr1q5ZL8lxA6trX9Rcg";

let supabaseClient = null;
if (typeof supabase !== "undefined") {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// KUNCI PENYIMPANAN LOKAL
const KEY_HAS_ONBOARDED       = "inventaris_has_onboarded";
const KEY_SESSION_USER        = "inventaris_session_user";
const KEY_REMEMBERED_ACCOUNTS = "inventaris_remembered_accounts";
const KEY_THEME               = "inventaris_theme_mode";
const KEY_LANGUAGE            = "inventaris_language";

const KEY_LOCAL_ITEMS         = "inventaris_local_items";
const KEY_LOCAL_MUTATIONS     = "inventaris_local_mutations";
const KEY_LOCAL_SERVICES      = "inventaris_local_services";
const KEY_PENDING_QUEUE       = "inventaris_pending_sync_queue";

const KEY_GUEST_ITEMS         = "inventaris_guest_items";
const KEY_GUEST_MUTATIONS     = "inventaris_guest_mutations";
const KEY_GUEST_SERVICES      = "inventaris_guest_services";

let inMemoryItems = [];
let inMemoryMutations = [];
let inMemoryServices = [];

// ============================================================
// KAMUS BILINGUAL (ID / EN)
// ============================================================
const i18nDictionary = {
  id: {
    skip: "Lewati",
    next: "Lanjut",
    login: "Masuk",
    register: "Daftar",
    or: "atau",
    guestMode: "Mode Tamu (Eksplorasi Sementara)",
    gateTitle: "NusaTech",
    gateSubtitle: "Sistem Manajemen Aset & Inventaris Terpadu",
    scanTitle: "Pindai QR / Barcode",
    scanInstruction: "Posisikan kode QR barang di dalam kotak",
    navDashboard: "Dashboard",
    navAssets: "Data Aset",
    navMutation: "Mutasi",
    navService: "Maintenance",
    navSettings: "Pengaturan",
    logout: "Keluar",
    welcome: "Selamat Datang,",
    totalValueSub: "Estimasi Nilai Keseluruhan",
    metricUnits: "Total Unit",
    metricTypes: "Jenis Barang",
    metricRooms: "Ruangan",
    quickMenu: "Menu Cepat",
    qaScan: "Scan QR",
    qaAdd: "Tambah Aset",
    qaMutate: "Mutasi",
    qaReport: "Laporan",
    recentActivity: "Aktivitas Terakhir",
    fieldCondition: "Kondisi Aset Lapangan",
    statusGood: "Siap Pakai (Baik)",
    statusMinor: "Rusak Ringan",
    statusMajor: "Rusak Berat",
    roomSpread: "Sebaran Ruangan",
    viewAll: "Buka Semua Aset",
    assetsTitle: "Data Inventaris",
    assetsDesc: "Kelola seluruh aset, informasi spesifikasi, dan stiker QR",
    export: "Ekspor",
    addAsset: "Tambah Aset",
    chipAll: "Semua",
    chipGood: "Baik",
    chipMinor: "Rusak Ringan",
    chipMajor: "Rusak Berat",
    chipAllStatus: "Semua Status",
    mutationTitle: "Mutasi Barang",
    mutationDesc: "Lacak perpindahan aset fisik antar-ruangan",
    recordMutation: "Catat Mutasi",
    serviceTitle: "Maintenance & Servis",
    serviceDesc: "Pantau proses pengerjaan dan biaya perbaikan aset",
    recordService: "Catat Servis",
    settingsTitle: "Pengaturan & Profil",
    settingsDesc: "Kustomisasi identitas, tampilan sistem, bahasa, dan data",
    groupDisplay: "Tampilan Antarmuka",
    themeMode: "Tema Aplikasi",
    themeDesc: "Pilih mode tampilan gelap, terang, atau otomatis",
    themeLight: "Terang",
    themeDark: "Gelap",
    appLanguage: "Bahasa Sistem",
    langDesc: "Pilih bahasa pengantar antarmuka aplikasi",
    groupData: "Manajemen Database",
    backupTitle: "Cadangkan Data (JSON)",
    backupDesc: "Unduh seluruh aset, mutasi, & servis ke file JSON",
    backupBtn: "Cadangkan",
    restoreTitle: "Pulihkan Data (JSON)",
    restoreDesc: "Unggah file cadangan untuk memulihkan database",
    restoreBtn: "Pulihkan",
    resetSimTitle: "Muat Ulang Data Simulasi",
    resetSimDesc: "Kembalikan ke data awal bawaan NusaTech",
    resetData: "Reset Data",
    groupSession: "Sesi & Akun",
    switchAccount: "Ganti Akun Staf",
    switchAccountDesc: "Masuk menggunakan profil pengguna lain",
    switchBtn: "Ganti",
    logoutTitle: "Keluar dari Aplikasi",
    logoutDesc: "Akhiri sesi aktif di perangkat ini",
    searchAssetsPh: "Cari nama barang, kode, ruangan...",
    searchMutationsPh: "Cari log perpindahan barang...",
    searchServicesPh: "Cari data perbaikan teknisi...",
    cardBtnEdit: "Edit",
    cardBtnDelete: "Hapus",
    costLabel: "Biaya",
    changeStatusBtn: "Ubah Status",
    statusQueue: "Dalam Antrean",
    statusProgress: "Sedang Dikerjakan",
    statusDone: "Selesai & Siap Pakai",
    statusProgressShort: "Dikerjakan",
    statusDoneShort: "Selesai",
    statusQueueDesc: "Menunggu pengecekan teknisi",
    statusProgressDesc: "Aset sedang dalam proses perbaikan fisik",
    statusDoneDesc: "Perbaikan tuntas, kondisi barang otomatis pulih \"Baik\"",
    thPhoto: "Foto",
    thName: "Nama Barang",
    thCode: "Kode Aset",
    thCategory: "Kategori",
    thRoom: "Ruangan",
    thStock: "Stok Unit",
    thCondition: "Kondisi Fisik",
    thAction: "Aksi",
    addItemModalTitle: "Tambah Aset Baru",
    addItemModalDesc: "Lengkapi informasi dan foto fisik inventaris",
    itemPhoto: "Foto Barang",
    takePhoto: "Ambil Foto",
    fromGallery: "Dari Galeri",
    removePhoto: "Hapus Foto",
    formItemName: "Nama Barang / Perangkat *",
    formItemCode: "Kode Aset *",
    formItemCategory: "Kategori *",
    formItemRoom: "Ruangan / Lokasi *",
    formItemCondition: "Kondisi Fisik *",
    formItemQty: "Jumlah Unit *",
    formItemUnit: "Satuan *",
    formItemAdvanced: "Informasi Tambahan (Opsional)",
    formItemPrice: "Estimasi Harga Beli / Unit (Rp)",
    formItemSupplier: "Nama Toko / Vendor / Asal Dana",
    formItemNotes: "Catatan Spesifikasi / Keterangan",
    cancel: "Batal",
    saveAsset: "Simpan Aset",
    mutateModalTitle: "Pindahkan Aset (Mutasi)",
    mutateModalDesc: "Pindahkan sebagian atau seluruh unit ke ruangan lain",
    mutateSelectLabel: "Pilih Aset yang Ingin Dipindah *",
    mutatePlaceholder: "Pilih barang inventaris...",
    sourceRoom: "Ruangan Asal",
    availableStock: "Tersedia",
    transferQty: "Jumlah Dipindahkan *",
    destRoom: "Ruangan Tujuan *",
    transferReason: "Alasan / Keterangan Mutasi",
    processTransfer: "Proses Mutasi",
    serviceModalTitle: "Catat Servis / Perbaikan",
    serviceModalDesc: "Lacak penanganan kerusakan fisik dan komponen aset",
    serviceSelectLabel: "Pilih Aset yang Diservis *",
    servicePlaceholder: "Pilih aset yang rusak...",
    serviceTech: "Nama Teknisi / Vendor *",
    initialStatus: "Status Awal *",
    repairCost: "Estimasi / Biaya Perbaikan (Rp)",
    issueDesc: "Deskripsi Kendala & Komponen Diganti *",
    saveService: "Simpan Servis",
    updateServiceStatus: "Perbarui Status Servis",
    pickAsset: "Pilih Aset",
    pickAssetDesc: "Sentuh barang inventaris yang ingin dipilih",
    exportModalTitle: "Ekspor Dokumen Laporan",
    exportItemsTitle: "Buku Induk Aset",
    exportItemsDesc: "Daftar seluruh barang, nilai finansial, dan sebaran ruang",
    exportMutationsTitle: "Laporan Mutasi Ruangan",
    exportMutationsDesc: "Catatan historis perpindahan unit beserta petugas & waktu",
    exportServicesTitle: "Rekap Servis & Biaya",
    exportServicesDesc: "Daftar perbaikan teknisi, suku cadang, & pengeluaran",
    printPdf: "Cetak / PDF",
    printLabel: "Cetak Label",
    saveImage: "Simpan Gambar",
    deleteItemTitle: "Hapus Data Aset?",
    deleteItemDesc: "Aset",
    deleteItemTail: "akan dihapus dari daftar aktif.",
    confirmDelete: "Ya, Hapus",
    updateProfileTitle: "Perbarui Profil Pengguna",
    updateProfileDesc: "Sesuaikan nama identitas dan peran tim Axentra",
    userNameLabel: "Nama Pengguna / Staf *",
    roleLabel: "Peran / Posisi *",
    save: "Simpan",
    manageAvatarTitle: "Kelola Foto Profil",
    manageAvatarDesc: "Pilih tindakan untuk foto akun Anda",
    cameraSelfieDesc: "Gunakan kamera ponsel untuk jepret langsung",
    galleryDesc: "Gunakan foto yang tersimpan di perangkat",
    deleteAvatar: "Hapus Foto Profil",
    deleteAvatarDesc: "Kembalikan tampilan avatar ke inisial huruf",
    logoutConfirmTitle: "Keluar dari Sesi?",
    logoutConfirmDesc: "Anda harus masuk kembali untuk mengelola aset inventaris.",
    emptyAssetsTitle: "Tidak ada aset ditemukan",
    emptyAssetsDesc: "Cobalah kata kunci lain atau daftarkan aset baru sekarang",
    emptyMutationsTitle: "Belum Ada Riwayat Mutasi",
    emptyMutationsDesc: "Aset yang dipindahkan antar-ruangan akan tercatat otomatis di sini.",
    emptyServicesTitle: "Tidak Ada Catatan Servis",
    emptyServicesDesc: "Aset yang dicatat dalam perbaikan teknisi akan tampil di sini."
  },
  en: {
    skip: "Skip",
    next: "Next",
    login: "Log In",
    register: "Register",
    or: "or",
    guestMode: "Guest Mode (Temporary Exploration)",
    gateTitle: "NusaTech",
    gateSubtitle: "Integrated Asset & Inventory Management System",
    scanTitle: "Scan QR / Barcode",
    scanInstruction: "Align asset QR code within frame",
    navDashboard: "Dashboard",
    navAssets: "Assets",
    navMutation: "Transfer",
    navService: "Service",
    navSettings: "Settings",
    logout: "Log Out",
    welcome: "Welcome,",
    totalValueSub: "Estimated Total Asset Value",
    metricUnits: "Total Units",
    metricTypes: "Categories",
    metricRooms: "Rooms",
    quickMenu: "Quick Actions",
    qaScan: "Scan QR",
    qaAdd: "Add Asset",
    qaMutate: "Transfer",
    qaReport: "Reports",
    recentActivity: "Recent Activity",
    fieldCondition: "Asset Operational Condition",
    statusGood: "Ready (Good)",
    statusMinor: "Minor Damage",
    statusMajor: "Critical Damage",
    roomSpread: "Room Distribution",
    viewAll: "View All Assets",
    assetsTitle: "Asset Inventory",
    assetsDesc: "Manage equipment inventory, specs, and printable QR tags",
    export: "Export",
    addAsset: "Add Asset",
    chipAll: "All",
    chipGood: "Good",
    chipMinor: "Minor Damage",
    chipMajor: "Critical Damage",
    chipAllStatus: "All Status",
    mutationTitle: "Asset Transfer Logs",
    mutationDesc: "Track physical item transfers across company rooms",
    recordMutation: "New Transfer",
    serviceTitle: "Maintenance & Repairs",
    serviceDesc: "Monitor technician repairs, part changes, and costs",
    recordService: "Log Service",
    settingsTitle: "Settings & Profile",
    settingsDesc: "Customize team profile, display mode, language, and backups",
    groupDisplay: "User Interface Display",
    themeMode: "Display Mode",
    themeDesc: "Choose light, dark, or system auto appearance",
    themeLight: "Light",
    themeDark: "Dark",
    appLanguage: "System Language",
    langDesc: "Select application interface language",
    groupData: "Database Management",
    backupTitle: "Backup Database (JSON)",
    backupDesc: "Download all items, transfers, & repairs as JSON",
    backupBtn: "Backup",
    restoreTitle: "Restore Database (JSON)",
    restoreDesc: "Upload backup file to restore complete database",
    restoreBtn: "Restore",
    resetSimTitle: "Reset Simulation Data",
    resetSimDesc: "Restore NusaTech initial default sample data",
    resetData: "Reset",
    groupSession: "Session & Access",
    switchAccount: "Switch Account",
    switchAccountDesc: "Sign in with a different staff profile",
    switchBtn: "Switch",
    logoutTitle: "Sign Out",
    logoutDesc: "End current active session on this device",
    searchAssetsPh: "Search item name, code, room...",
    searchMutationsPh: "Search item transfer records...",
    searchServicesPh: "Search technician repair logs...",
    cardBtnEdit: "Edit",
    cardBtnDelete: "Delete",
    costLabel: "Cost",
    changeStatusBtn: "Change Status",
    statusQueue: "In Queue",
    statusProgress: "In Progress",
    statusDone: "Completed & Ready",
    statusProgressShort: "In Progress",
    statusDoneShort: "Completed",
    statusQueueDesc: "Awaiting inspection",
    statusProgressDesc: "Physical repair is currently ongoing",
    statusDoneDesc: "Repair completed, asset condition automatically restored to \"Good\"",
    thPhoto: "Photo",
    thName: "Item Name",
    thCode: "Asset Code",
    thCategory: "Category",
    thRoom: "Location",
    thStock: "Quantity",
    thCondition: "Condition",
    thAction: "Action",
    addItemModalTitle: "Add New Asset",
    addItemModalDesc: "Fill in asset details and capture physical photo",
    itemPhoto: "Item Photo",
    takePhoto: "Take Photo",
    fromGallery: "From Gallery",
    removePhoto: "Remove Photo",
    formItemName: "Item / Hardware Name *",
    formItemCode: "Asset Code *",
    formItemCategory: "Category *",
    formItemRoom: "Room / Location *",
    formItemCondition: "Condition *",
    formItemQty: "Quantity *",
    formItemUnit: "Unit *",
    formItemAdvanced: "Additional Information (Optional)",
    formItemPrice: "Purchase Price / Unit (IDR)",
    formItemSupplier: "Vendor / Funding Source",
    formItemNotes: "Technical Specs / Remarks",
    cancel: "Cancel",
    saveAsset: "Save Asset",
    mutateModalTitle: "Transfer Asset",
    mutateModalDesc: "Relocate units to another room",
    mutateSelectLabel: "Select Asset to Move *",
    mutatePlaceholder: "Choose an inventory item...",
    sourceRoom: "Source Room",
    availableStock: "Available",
    transferQty: "Transfer Quantity *",
    destRoom: "Destination Room *",
    transferReason: "Transfer Purpose / Notes",
    processTransfer: "Execute Transfer",
    serviceModalTitle: "Log Maintenance / Repair",
    serviceModalDesc: "Track hardware damage, parts, and costs",
    serviceSelectLabel: "Select Asset to Repair *",
    servicePlaceholder: "Select damaged asset...",
    serviceTech: "Technician / Vendor Name *",
    initialStatus: "Initial Status *",
    repairCost: "Estimated Repair Cost (IDR)",
    issueDesc: "Issue Description & Replaced Parts *",
    saveService: "Save Service Log",
    updateServiceStatus: "Update Repair Status",
    pickAsset: "Select Asset",
    pickAssetDesc: "Tap an inventory item to select",
    exportModalTitle: "Export Report Document",
    exportItemsTitle: "Master Inventory Ledger",
    exportItemsDesc: "Complete asset list, financial valuation, and room layout",
    exportMutationsTitle: "Transfer History Report",
    exportMutationsDesc: "Historical records of item moves with staff and timestamp",
    exportServicesTitle: "Maintenance & Repair Summary",
    exportServicesDesc: "Log of technician repairs, replaced parts, and expenses",
    printPdf: "Print / PDF",
    printLabel: "Print Label",
    saveImage: "Save Image",
    deleteItemTitle: "Delete Asset?",
    deleteItemDesc: "Asset",
    deleteItemTail: "will be removed from active inventory.",
    confirmDelete: "Yes, Delete",
    updateProfileTitle: "Update Profile",
    updateProfileDesc: "Adjust account name and team role",
    userNameLabel: "User / Team Name *",
    roleLabel: "Role / Position *",
    save: "Save",
    manageAvatarTitle: "Manage Profile Photo",
    manageAvatarDesc: "Choose action for your account avatar",
    cameraSelfieDesc: "Use phone camera to snap directly",
    galleryDesc: "Select an image file from storage",
    deleteAvatar: "Remove Avatar",
    deleteAvatarDesc: "Restore avatar to letter initials",
    logoutConfirmTitle: "Sign Out of Session?",
    logoutConfirmDesc: "You will need to sign back in to manage company inventory.",
    emptyAssetsTitle: "No assets found",
    emptyAssetsDesc: "Try a different search term or register a new asset now",
    emptyMutationsTitle: "No Transfer Records Yet",
    emptyMutationsDesc: "Items moved across rooms will be tracked here automatically.",
    emptyServicesTitle: "No Maintenance Records",
    emptyServicesDesc: "Assets logged for technician repairs will appear here."
  }
};

const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=400&q=80";

const demoSimulationItems = [
  {
    id: "1",
    name: "Server Rack Node 2U",
    code: "NST-001",
    category: "Network & Server",
    room: "Server Room",
    qty: 6,
    unit: "Unit",
    condition: "Baik",
    price: 18500000,
    supplier: "PT Data Sentosa",
    notes: "Production Core Infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "2",
    name: "Workstation Ryzen 9 64GB",
    code: "NST-002",
    category: "Hardware IT",
    room: "Dev Studio",
    qty: 12,
    unit: "Unit",
    condition: "Baik",
    price: 24000000,
    supplier: "PT Sinar Teknologi",
    notes: "Dedicated Mobile & Web Engineering",
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "3",
    name: "Kamera Sony A7IV",
    code: "NST-003",
    category: "Peralatan Studio/Kreatif",
    room: "Creative Lab",
    qty: 2,
    unit: "Unit",
    condition: "Baik",
    price: 36000000,
    supplier: "CV Media Visual",
    notes: "Perlengkapan produksi konten & promosi",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "4",
    name: "Ergonomic Mesh Chair",
    code: "NST-004",
    category: "Furniture Kantor",
    room: "Executive Office",
    qty: 16,
    unit: "Buah",
    condition: "Baik",
    price: 2100000,
    supplier: "CV Ergonomis Jaya",
    notes: "Fasilitas staf tim Axentra",
    image: "https://images.unsplash.com/photo-1580481077198-c847b4d8d145?auto=format&fit=crop&w=400&q=80"
  }
];

// ELEMEN DOM
let currentSlideIndex = 0;
let currentAuthMode = "login";
let html5QrScannerInstance = null;
let currentActiveFilterCondition = "all";
let currentActiveServiceFilter = "all";
let itemPendingDeleteId = null;
let currentQrDisplayItem = null;
let currentPickerMode = "mutation";
let activeServiceTargetId = null;

const splashScreen = document.getElementById("splashScreen");
const onboardingScreen = document.getElementById("onboardingScreen");
const landingGateScreen = document.getElementById("landingGateScreen");
const authModal = document.getElementById("authModal");
const switchAccountModal = document.getElementById("switchAccountModal");
const itemFormModal = document.getElementById("itemFormModal");
const mutationFormModal = document.getElementById("mutationFormModal");
const serviceFormModal = document.getElementById("serviceFormModal");
const serviceStatusModal = document.getElementById("serviceStatusModal");
const exportReportModal = document.getElementById("exportReportModal");
const lblStatusChangeItemTitle = document.getElementById("lblStatusChangeItemTitle");
const itemPickerModal = document.getElementById("itemPickerModal");
const pickerSheetTitle = document.getElementById("pickerSheetTitle");
const pickerSheetSubtitle = document.getElementById("pickerSheetSubtitle");
const qrDetailModal = document.getElementById("qrDetailModal");
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const editProfileModal = document.getElementById("editProfileModal");
const avatarActionsModal = document.getElementById("avatarActionsModal");
const logoutConfirmModal = document.getElementById("logoutConfirmModal");
const fullscreenScanner = document.getElementById("fullscreenScanner");
const mainApp = document.getElementById("mainApp");

const btnNextOnboarding = document.getElementById("btnNextOnboarding");
const btnSkipOnboarding = document.getElementById("btnSkipOnboarding");
const slides = document.querySelectorAll(".onboarding-slide");
const dots = document.querySelectorAll(".dots-indicator .dot");

const btnGateLogin = document.getElementById("btnGateLogin");
const btnGateRegister = document.getElementById("btnGateRegister");
const btnGateGuest = document.getElementById("btnGateGuest");

const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");
const authSubmitText = document.getElementById("authSubmitText");
const authHeaderIcon = document.getElementById("authHeaderIcon");
const authAlert = document.getElementById("authAlert");
const authForm = document.getElementById("authForm");
const fieldUsername = document.getElementById("fieldUsername");
const inputUsername = document.getElementById("inputUsername");
const inputEmail = document.getElementById("inputEmail");
const fieldPassword = document.getElementById("fieldPassword");
const inputPassword = document.getElementById("inputPassword");
const authToggleText = document.getElementById("authToggleText");
const btnSwitchAuthMode = document.getElementById("btnSwitchAuthMode");
const btnGoogleAuth = document.getElementById("btnGoogleAuth");

const switchAccountsList = document.getElementById("switchAccountsList");
const btnAddNewAccountTrigger = document.getElementById("btnAddNewAccountTrigger");

const topbarUserProfileBtn = document.getElementById("topbarUserProfileBtn");
const btnTopbarSettings = document.getElementById("btnTopbarSettings");
const headerUserName = document.getElementById("headerUserName");
const headerAvatarContainer = document.getElementById("headerAvatarContainer");
const cloudStatusText = document.getElementById("cloudStatusText");

const profileCardAvatar = document.getElementById("profileCardAvatar");
const profileDisplayName = document.getElementById("profileDisplayName");
const profileDisplayRole = document.getElementById("profileDisplayRole");
const profileDisplayEmail = document.getElementById("profileDisplayEmail");
const btnEditProfileName = document.getElementById("btnEditProfileName");
const formEditProfile = document.getElementById("formEditProfile");
const inputEditProfileName = document.getElementById("inputEditProfileName");
const inputEditProfileRole = document.getElementById("inputEditProfileRole");
const btnCancelEditProfile = document.getElementById("btnCancelEditProfile");

const btnTriggerAvatarActions = document.getElementById("btnTriggerAvatarActions");
const inputUploadAvatarCamera = document.getElementById("inputUploadAvatarCamera");
const inputUploadAvatarGallery = document.getElementById("inputUploadAvatarGallery");
const btnDeleteAvatarPhoto = document.getElementById("btnDeleteAvatarPhoto");

const segThemeBtns = document.querySelectorAll("[data-theme-val]");
const segLangBtns = document.querySelectorAll("[data-lang-val]");

const btnBackupDatabase = document.getElementById("btnBackupDatabase");
const inputRestoreDatabase = document.getElementById("inputRestoreDatabase");
const btnSeedDefaultData = document.getElementById("btnSeedDefaultData");
const btnSwitchAccount = document.getElementById("btnSwitchAccount");
const btnLogout = document.getElementById("btnLogout");
const btnSidebarLogout = document.getElementById("btnSidebarLogout");
const btnCancelLogout = document.getElementById("btnCancelLogout");
const btnExecuteLogout = document.getElementById("btnExecuteLogout");

const toastMessage = document.getElementById("toastMessage");
const btnSeeAllAssets = document.getElementById("btnSeeAllAssets");
const homeActivityFeed = document.getElementById("homeActivityFeed");
const qaScan = document.getElementById("qaScan");
const qaAdd = document.getElementById("qaAdd");
const qaMutate = document.getElementById("qaMutate");
const qaReport = document.getElementById("qaReport");

const formInventoryItem = document.getElementById("formInventoryItem");
const itemFormTitle = document.getElementById("itemFormTitle");
const editItemId = document.getElementById("editItemId");
const itemImageBase64 = document.getElementById("itemImageBase64");
const inputItemPhoto = document.getElementById("inputItemPhoto");
const inputItemPhotoCamera = document.getElementById("inputItemPhotoCamera");
const imgItemPreview = document.getElementById("imgItemPreview");
const itemPhotoPlaceholder = document.getElementById("itemPhotoPlaceholder");
const btnRemoveItemPhoto = document.getElementById("btnRemoveItemPhoto");

const btnToggleAdvancedFields = document.getElementById("btnToggleAdvancedFields");
const advancedFieldsContainer = document.getElementById("advancedFieldsContainer");
const inputItemName = document.getElementById("inputItemName");
const inputItemCode = document.getElementById("inputItemCode");
const selectItemCategory = document.getElementById("selectItemCategory");
const inputItemRoom = document.getElementById("inputItemRoom");
const selectItemCondition = document.getElementById("selectItemCondition");
const inputItemQty = document.getElementById("inputItemQty");
const selectItemUnit = document.getElementById("selectItemUnit");
const inputItemPrice = document.getElementById("inputItemPrice");
const inputItemSupplier = document.getElementById("inputItemSupplier");
const inputItemNotes = document.getElementById("inputItemNotes");
const btnCancelItemForm = document.getElementById("btnCancelItemForm");

const formMutation = document.getElementById("formMutation");
const btnTriggerItemPicker = document.getElementById("btnTriggerItemPicker");
const selectedMutateItemId = document.getElementById("selectedMutateItemId");
const lblSelectedItemName = document.getElementById("lblSelectedItemName");
const lblMutateSourceRoom = document.getElementById("lblMutateSourceRoom");
const lblMutateSourceQty = document.getElementById("lblMutateSourceQty");
const inputMutateQty = document.getElementById("inputMutateQty");
const inputMutateDestRoom = document.getElementById("inputMutateDestRoom");
const inputMutateNotes = document.getElementById("inputMutateNotes");
const btnCancelMutation = document.getElementById("btnCancelMutation");
const btnOpenMutasiModal = document.getElementById("btnOpenMutasiModal");
const mutationLogsContainer = document.getElementById("mutationLogsContainer");
const mutationsEmptyState = document.getElementById("mutationsEmptyState");
const inputSearchMutations = document.getElementById("inputSearchMutations");

const formService = document.getElementById("formService");
const btnOpenServiceModal = document.getElementById("btnOpenServiceModal");
const btnTriggerServiceItemPicker = document.getElementById("btnTriggerServiceItemPicker");
const selectedServiceItemId = document.getElementById("selectedServiceItemId");
const lblSelectedServiceItemName = document.getElementById("lblSelectedServiceItemName");
const inputServiceTech = document.getElementById("inputServiceTech");
const selectServiceStatus = document.getElementById("selectServiceStatus");
const inputServiceCost = document.getElementById("inputServiceCost");
const inputServiceNotes = document.getElementById("inputServiceNotes");
const btnCancelService = document.getElementById("btnCancelService");
const serviceLogsContainer = document.getElementById("serviceLogsContainer");
const servicesEmptyState = document.getElementById("servicesEmptyState");
const inputSearchServices = document.getElementById("inputSearchServices");
const serviceFilterChips = document.querySelectorAll(".service-filter-chip");

const pickerItemsList = document.getElementById("pickerItemsList");
const btnAsetScreenAdd = document.getElementById("btnAsetScreenAdd");
const inputSearchAssets = document.getElementById("inputSearchAssets");
const filterChips = document.querySelectorAll(".chip:not(.service-filter-chip)");
const mobileItemsContainer = document.getElementById("mobileItemsContainer");
const desktopTableBody = document.getElementById("desktopTableBody");
const assetsEmptyState = document.getElementById("assetsEmptyState");

const detailItemPhotoImg = document.getElementById("detailItemPhotoImg");
const btnExitScanner = document.getElementById("btnExitScanner");
const btnPrintQr = document.getElementById("btnPrintQr");
const btnDownloadQr = document.getElementById("btnDownloadQr");

const btnCancelDelete = document.getElementById("btnCancelDelete");
const btnExecuteDelete = document.getElementById("btnExecuteDelete");

const navBtns = document.querySelectorAll(".nav-btn");
const bNavItems = document.querySelectorAll(".b-nav-item");

// ============================================================
// ENGINE DATA: DUAL STORAGE (LOCAL + SUPABASE)
// ============================================================
function getCurrentUserSession() {
  try {
    const raw = localStorage.getItem(KEY_SESSION_USER);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function isGuestSession() {
  const session = getCurrentUserSession();
  return Boolean(session && session.isGuest);
}

function updateConnectionBadge() {
  if (!cloudStatusText) return;
  if (isGuestSession()) {
    cloudStatusText.textContent = "Guest Sandbox";
  } else if (navigator.onLine) {
    cloudStatusText.textContent = "Supabase Cloud";
  } else {
    cloudStatusText.textContent = "Offline (Lokal)";
  }
}

window.addEventListener("online", () => {
  updateConnectionBadge();
  showToast("Koneksi tersambung. Menyinkronkan data...");
  processPendingSyncQueue();
});

window.addEventListener("offline", () => {
  updateConnectionBadge();
  showToast("Mode Offline: Data disimpan di perangkat.");
});

async function fetchAllActiveData() {
  updateConnectionBadge();

  if (isGuestSession()) {
    try {
      inMemoryItems = JSON.parse(localStorage.getItem(KEY_GUEST_ITEMS)) || [];
      inMemoryMutations = JSON.parse(localStorage.getItem(KEY_GUEST_MUTATIONS)) || [];
      inMemoryServices = JSON.parse(localStorage.getItem(KEY_GUEST_SERVICES)) || [];
    } catch {
      inMemoryItems = [];
      inMemoryMutations = [];
      inMemoryServices = [];
    }
    return;
  }

  try {
    inMemoryItems = JSON.parse(localStorage.getItem(KEY_LOCAL_ITEMS)) || [];
    inMemoryMutations = JSON.parse(localStorage.getItem(KEY_LOCAL_MUTATIONS)) || [];
    inMemoryServices = JSON.parse(localStorage.getItem(KEY_LOCAL_SERVICES)) || [];
  } catch {
    inMemoryItems = [];
    inMemoryMutations = [];
    inMemoryServices = [];
  }

  if (navigator.onLine && supabaseClient) {
    try {
      const [resItems, resMutations, resServices] = await Promise.all([
        supabaseClient.from("items").select("*").order("created_at", { ascending: false }),
        supabaseClient.from("mutations").select("*").order("created_at", { ascending: false }),
        supabaseClient.from("services").select("*").order("created_at", { ascending: false })
      ]);

      if (resItems.data) {
        inMemoryItems = resItems.data;
        localStorage.setItem(KEY_LOCAL_ITEMS, JSON.stringify(inMemoryItems));
      }
      
      if (resMutations.data) {
        inMemoryMutations = resMutations.data.map(m => ({
          id: m.id,
          itemName: m.item_name,
          itemCode: m.item_code,
          qty: m.qty,
          unit: m.unit,
          fromRoom: m.from_room,
          toRoom: m.to_room,
          date: m.date,
          by: m.by,
          notes: m.notes,
          image: m.image
        }));
        localStorage.setItem(KEY_LOCAL_MUTATIONS, JSON.stringify(inMemoryMutations));
      }

      if (resServices.data) {
        inMemoryServices = resServices.data.map(s => ({
          id: s.id,
          itemId: s.item_id,
          itemName: s.item_name,
          itemCode: s.item_code,
          room: s.room,
          technician: s.technician,
          status: s.status,
          cost: s.cost,
          notes: s.notes,
          date: s.date,
          image: s.image
        }));
        localStorage.setItem(KEY_LOCAL_SERVICES, JSON.stringify(inMemoryServices));
      }
    } catch (err) {
      console.warn("Gagal membaca cloud, menggunakan cache lokal:", err);
    }
  }
}

function pushToSyncQueue(actionType, table, payload) {
  try {
    const queue = JSON.parse(localStorage.getItem(KEY_PENDING_QUEUE)) || [];
    queue.push({ actionType, table, payload, timestamp: Date.now() });
    localStorage.setItem(KEY_PENDING_QUEUE, JSON.stringify(queue));
  } catch (e) {}
}

async function processPendingSyncQueue() {
  if (!navigator.onLine || !supabaseClient || isGuestSession()) return;
  try {
    const queue = JSON.parse(localStorage.getItem(KEY_PENDING_QUEUE)) || [];
    if (queue.length === 0) return;

    for (const item of queue) {
      if (item.actionType === "upsert") {
        await supabaseClient.from(item.table).upsert(item.payload);
      } else if (item.actionType === "delete") {
        await supabaseClient.from(item.table).delete().eq("id", item.payload.id);
      }
    }
    localStorage.removeItem(KEY_PENDING_QUEUE);
    showToast("Sinkronisasi cloud tuntas!");
  } catch (err) {
    console.warn("Gagal proses antrean sync:", err);
  }
}

async function saveItemsData(items) {
  inMemoryItems = items;
  if (isGuestSession()) {
    localStorage.setItem(KEY_GUEST_ITEMS, JSON.stringify(items));
    return;
  }
  
  localStorage.setItem(KEY_LOCAL_ITEMS, JSON.stringify(items));

  if (navigator.onLine && supabaseClient) {
    try {
      await supabaseClient.from("items").upsert(items);
    } catch (e) {
      pushToSyncQueue("upsert", "items", items);
    }
  } else {
    pushToSyncQueue("upsert", "items", items);
  }
}

async function saveMutationsData(mutations) {
  inMemoryMutations = mutations;
  if (isGuestSession()) {
    localStorage.setItem(KEY_GUEST_MUTATIONS, JSON.stringify(mutations));
    return;
  }

  localStorage.setItem(KEY_LOCAL_MUTATIONS, JSON.stringify(mutations));

  if (mutations.length > 0) {
    const latest = mutations[0];
    const payload = [{
      id: latest.id,
      item_name: latest.itemName,
      item_code: latest.itemCode,
      qty: latest.qty,
      unit: latest.unit,
      from_room: latest.fromRoom,
      to_room: latest.toRoom,
      date: latest.date,
      by: latest.by,
      notes: latest.notes,
      image: latest.image
    }];

    if (navigator.onLine && supabaseClient) {
      try {
        await supabaseClient.from("mutations").insert(payload);
      } catch (e) {
        pushToSyncQueue("upsert", "mutations", payload);
      }
    } else {
      pushToSyncQueue("upsert", "mutations", payload);
    }
  }
}

async function saveServicesData(services) {
  inMemoryServices = services;
  if (isGuestSession()) {
    localStorage.setItem(KEY_GUEST_SERVICES, JSON.stringify(services));
    return;
  }

  localStorage.setItem(KEY_LOCAL_SERVICES, JSON.stringify(services));

  if (services.length > 0) {
    const latest = services[0];
    const payload = [{
      id: latest.id,
      item_id: latest.itemId,
      item_name: latest.itemName,
      item_code: latest.itemCode,
      room: latest.room,
      technician: latest.technician,
      status: latest.status,
      cost: latest.cost,
      notes: latest.notes,
      date: latest.date,
      image: latest.image
    }];

    if (navigator.onLine && supabaseClient) {
      try {
        await supabaseClient.from("services").upsert(payload);
      } catch (e) {
        pushToSyncQueue("upsert", "services", payload);
      }
    } else {
      pushToSyncQueue("upsert", "services", payload);
    }
  }
}

function getStoredItems() { return inMemoryItems; }
function getStoredMutations() { return inMemoryMutations; }
function getStoredServices() { return inMemoryServices; }

// ============================================================
// BAHASA & TEMA
// ============================================================
function setLanguage(lang) {
  const targetLang = (lang === "en") ? "en" : "id";
  localStorage.setItem(KEY_LANGUAGE, targetLang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (i18nDictionary[targetLang] && i18nDictionary[targetLang][key]) {
      el.textContent = i18nDictionary[targetLang][key];
    }
  });

  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.dataset.i18nPh;
    if (i18nDictionary[targetLang] && i18nDictionary[targetLang][key]) {
      el.placeholder = i18nDictionary[targetLang][key];
    }
  });

  segLangBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.langVal === targetLang);
  });

  renderAllData();
}

function applyTheme(themeMode) {
  localStorage.setItem(KEY_THEME, themeMode);
  
  if (themeMode === "dark") {
    document.body.classList.add("dark");
  } else if (themeMode === "light") {
    document.body.classList.remove("dark");
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", prefersDark);
  }

  segThemeBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.themeVal === themeMode);
  });
}

segThemeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    applyTheme(btn.dataset.themeVal);
    showToast(`Tema diubah: ${btn.dataset.themeVal}`);
  });
});

segLangBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.langVal);
    showToast(`Language set to: ${btn.dataset.langVal.toUpperCase()}`);
  });
});

// ============================================================
// NAVIGASI & MODAL LAYER
// ============================================================
function openModalLayer(modalElement) {
  if (!modalElement) return;
  modalElement.classList.remove("hidden");
  
  const modalId = modalElement.dataset.modal || modalElement.id;
  history.pushState({ type: "modal", modalId: modalId }, "", `#${modalId}`);
}

function closeModalDirectly(modalElement) {
  if (!modalElement || modalElement.classList.contains("hidden")) return;
  if (location.hash.includes(modalElement.dataset.modal || modalElement.id)) {
    history.back();
  } else {
    modalElement.classList.add("hidden");
    if (modalElement === fullscreenScanner) stopFullscreenScanner();
  }
}

function closeActiveTopModal() {
  const activeSubModal = document.querySelector(".app-modal.sub-modal:not(.hidden)");
  if (activeSubModal) {
    closeModalDirectly(activeSubModal);
    return true;
  }

  const activeModal = document.querySelector(".app-modal:not(.hidden), .fullscreen-scanner:not(.hidden)");
  if (activeModal) {
    closeModalDirectly(activeModal);
    return true;
  }
  return false;
}

window.addEventListener("popstate", event => {
  const activeSubModal = document.querySelector(".app-modal.sub-modal:not(.hidden)");
  if (activeSubModal) {
    activeSubModal.classList.add("hidden");
    event.preventDefault();
    return;
  }

  const activeModal = document.querySelector(".app-modal:not(.hidden), .fullscreen-scanner:not(.hidden)");
  if (activeModal) {
    activeModal.classList.add("hidden");
    if (activeModal === fullscreenScanner) stopFullscreenScanner();
    event.preventDefault();
    return;
  }

  if (event.state && event.state.tab) {
    switchTabView(event.state.tab, false);
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (closeActiveTopModal()) e.preventDefault();
  }
});

document.addEventListener("click", e => {
  if (e.target.closest(".btn-close-modal")) {
    const modal = e.target.closest(".app-modal");
    closeModalDirectly(modal);
    return;
  }

  if (e.target.classList.contains("modal-backdrop")) {
    const modal = e.target.closest(".app-modal");
    closeModalDirectly(modal);
  }
});

btnCancelItemForm?.addEventListener("click", () => closeModalDirectly(itemFormModal));
btnCancelMutation?.addEventListener("click", () => closeModalDirectly(mutationFormModal));
btnCancelService?.addEventListener("click", () => closeModalDirectly(serviceFormModal));
btnCancelDelete?.addEventListener("click", () => closeModalDirectly(deleteConfirmModal));
btnCancelEditProfile?.addEventListener("click", () => closeModalDirectly(editProfileModal));
btnCancelLogout?.addEventListener("click", () => closeModalDirectly(logoutConfirmModal));

function initDragToDismiss() {
  const modalContainers = document.querySelectorAll(".modal-container");
  modalContainers.forEach(sheet => {
    const handle = sheet.querySelector(".sheet-drag-handle");
    if (!handle) return;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    handle.addEventListener("touchstart", e => {
      startY = e.touches[0].clientY;
      isDragging = true;
      sheet.style.transition = "none";
    }, { passive: true });

    handle.addEventListener("touchmove", e => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const diffY = currentY - startY;

      if (diffY > 0) {
        sheet.style.transform = `translateY(${diffY}px)`;
      }
    }, { passive: true });

    handle.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;
      const diffY = currentY - startY;
      sheet.style.transition = "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)";

      if (diffY > 70) {
        sheet.style.transform = "translateY(100%)";
        setTimeout(() => {
          const parentModal = sheet.closest(".app-modal");
          closeModalDirectly(parentModal);
          sheet.style.transform = "";
        }, 180);
      } else {
        sheet.style.transform = "";
      }
    });
  });
}

// ============================================================
// ROUTER & INISIALISASI
// ============================================================
async function initAppFlow() {
  const savedTheme = localStorage.getItem(KEY_THEME) || "auto";
  applyTheme(savedTheme);

  const savedLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  setLanguage(savedLang);

  if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        const u = session.user;
        const meta = u.user_metadata || {};
        const fullName = meta.full_name || meta.name || u.email.split("@")[0];
        const avatarUrl = meta.avatar_url || meta.picture || "";

        const googleUserSession = {
          id: u.id,
          fullName: fullName,
          email: u.email,
          role: "PT NusaTech Digital Indonesia",
          avatar: avatarUrl,
          isGuest: false
        };

        try {
          await supabaseClient.from("users").upsert([{
            id: u.id,
            username: fullName,
            email: u.email,
            role: "PT NusaTech Digital Indonesia",
            avatar: avatarUrl,
            auth_provider: "google",
            last_sign_in: new Date().toISOString()
          }]);
        } catch (err) {}

        saveRememberedAccount(googleUserSession);
        localStorage.setItem(KEY_SESSION_USER, JSON.stringify(googleUserSession));
        localStorage.setItem(KEY_HAS_ONBOARDED, "true");

        if (window.location.hash && window.location.hash.includes("access_token")) {
          window.history.replaceState(null, null, window.location.pathname);
        }

        await fetchAllActiveData();
        showScreen("app");
        showToast(`Selamat datang, ${fullName}!`);
      }
    });
  }

  setTimeout(async () => {
    splashScreen?.classList.add("hidden");

    const hasOnboarded = localStorage.getItem(KEY_HAS_ONBOARDED) === "true";
    const currentSession = getCurrentUserSession();

    if (!hasOnboarded) {
      showScreen("onboarding");
    } else if (!currentSession) {
      showScreen("gate");
    } else {
      await fetchAllActiveData();
      showScreen("app");
    }
    initDragToDismiss();
  }, 600);
}

function showScreen(screenName) {
  onboardingScreen?.classList.add("hidden");
  landingGateScreen?.classList.add("hidden");
  authModal?.classList.add("hidden");
  switchAccountModal?.classList.add("hidden");
  itemFormModal?.classList.add("hidden");
  mutationFormModal?.classList.add("hidden");
  serviceFormModal?.classList.add("hidden");
  serviceStatusModal?.classList.add("hidden");
  exportReportModal?.classList.add("hidden");
  itemPickerModal?.classList.add("hidden");
  qrDetailModal?.classList.add("hidden");
  deleteConfirmModal?.classList.add("hidden");
  editProfileModal?.classList.add("hidden");
  avatarActionsModal?.classList.add("hidden");
  logoutConfirmModal?.classList.add("hidden");
  fullscreenScanner?.classList.add("hidden");
  mainApp?.classList.add("hidden");

  if (screenName === "onboarding") {
    onboardingScreen?.classList.remove("hidden");
    updateSlide(0);
  } else if (screenName === "gate") {
    landingGateScreen?.classList.remove("hidden");
  } else if (screenName === "app") {
    mainApp?.classList.remove("hidden");
    renderUserProfileHeader();
    renderAllData();
    switchTabView("home", false);
  }
}

function showToast(msg) {
  toastMessage.textContent = msg;
  toastMessage.classList.add("show");
  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toastMessage.classList.remove("show");
  }, 2200);
}

function switchTabView(tabKey, pushHistory = true) {
  document.querySelectorAll(".tab-view").forEach(view => view.classList.add("hidden"));
  
  const targetId = "tabView" + tabKey.charAt(0).toUpperCase() + tabKey.slice(1);
  const targetView = document.getElementById(targetId);
  if (targetView) targetView.classList.remove("hidden");

  navBtns.forEach(b => b.classList.toggle("active", b.dataset.nav === tabKey));
  bNavItems.forEach(b => b.classList.toggle("active", b.dataset.nav === tabKey));

  if (pushHistory) {
    history.pushState({ tab: tabKey }, "", `#${tabKey}`);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

navBtns.forEach(btn => btn.addEventListener("click", () => switchTabView(btn.dataset.nav)));
bNavItems.forEach(item => item.addEventListener("click", () => switchTabView(item.dataset.nav)));
btnSeeAllAssets?.addEventListener("click", () => switchTabView("aset"));

topbarUserProfileBtn?.addEventListener("click", () => switchTabView("menu"));
btnTopbarSettings?.addEventListener("click", () => switchTabView("menu"));

// ============================================================
// PROFIL & AKSI FOTO
// ============================================================
function renderUserProfileHeader() {
  const session = getCurrentUserSession() || { fullName: "Axentra", email: "admin@nusatech.co.id", role: "PT NusaTech Digital Indonesia", avatar: "" };
  
  headerUserName.textContent = session.fullName;
  profileDisplayName.textContent = session.fullName;
  profileDisplayRole.textContent = session.role || "PT NusaTech Digital Indonesia";
  profileDisplayEmail.textContent = session.email;

  const initial = (session.fullName || "N").charAt(0).toUpperCase();

  if (session.avatar) {
    headerAvatarContainer.innerHTML = `<img src="${session.avatar}" alt="Avatar">`;
    profileCardAvatar.innerHTML = `<img src="${session.avatar}" alt="Avatar">`;
  } else {
    headerAvatarContainer.innerHTML = `<span>${initial}</span>`;
    profileCardAvatar.innerHTML = `<span>${initial}</span>`;
  }
}

btnEditProfileName?.addEventListener("click", () => {
  const session = getCurrentUserSession() || {};
  inputEditProfileName.value = session.fullName || "Axentra";
  inputEditProfileRole.value = session.role || "PT NusaTech Digital Indonesia";
  openModalLayer(editProfileModal);
});

formEditProfile?.addEventListener("submit", async e => {
  e.preventDefault();
  const session = getCurrentUserSession() || {};
  const newName = inputEditProfileName.value.trim();
  const newRole = inputEditProfileRole.value.trim();

  if (!newName) {
    showToast("Nama tidak boleh kosong!");
    return;
  }

  session.fullName = newName;
  session.role = newRole || "PT NusaTech Digital Indonesia";
  localStorage.setItem(KEY_SESSION_USER, JSON.stringify(session));

  if (!isGuestSession() && supabaseClient && session.email) {
    try {
      await supabaseClient.from("users").update({ username: newName, role: session.role }).eq("email", session.email);
    } catch (err) {}
  }

  renderUserProfileHeader();
  renderHomeMetrics();
  closeModalDirectly(editProfileModal);
  showToast("Profil berhasil diperbarui!");
});

btnTriggerAvatarActions?.addEventListener("click", () => {
  openModalLayer(avatarActionsModal);
});

function handleAvatarUpload(file) {
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    showToast("Ukuran foto maksimal 2 MB!");
    return;
  }

  const reader = new FileReader();
  reader.onload = async ev => {
    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      const maxDim = 300;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height *= maxDim / width;
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width *= maxDim / height;
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const base64Img = canvas.toDataURL("image/jpeg", 0.8);
      const session = getCurrentUserSession() || {};
      session.avatar = base64Img;
      localStorage.setItem(KEY_SESSION_USER, JSON.stringify(session));

      if (!isGuestSession() && supabaseClient && session.email) {
        try {
          await supabaseClient.from("users").update({ avatar: base64Img }).eq("email", session.email);
        } catch (err) {}
      }

      renderUserProfileHeader();
      closeModalDirectly(avatarActionsModal);
      showToast("Foto profil berhasil diperbarui!");
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

inputUploadAvatarCamera?.addEventListener("change", e => handleAvatarUpload(e.target.files[0]));
inputUploadAvatarGallery?.addEventListener("change", e => handleAvatarUpload(e.target.files[0]));

btnDeleteAvatarPhoto?.addEventListener("click", async () => {
  const session = getCurrentUserSession() || {};
  session.avatar = "";
  localStorage.setItem(KEY_SESSION_USER, JSON.stringify(session));

  if (!isGuestSession() && supabaseClient && session.email) {
    try {
      await supabaseClient.from("users").update({ avatar: "" }).eq("email", session.email);
    } catch (err) {}
  }

  renderUserProfileHeader();
  closeModalDirectly(avatarActionsModal);
  showToast("Foto profil berhasil dihapus!");
});

// ============================================================
// FOTO BARANG (KOMPRESI)
// ============================================================
function handlePhotoUpload(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxDim = 500;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height *= maxDim / width;
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width *= maxDim / height;
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
      setItemPhotoPreview(compressedBase64);
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

inputItemPhoto?.addEventListener("change", e => handlePhotoUpload(e.target.files[0]));
inputItemPhotoCamera?.addEventListener("change", e => handlePhotoUpload(e.target.files[0]));

function setItemPhotoPreview(base64Url) {
  itemImageBase64.value = base64Url || "";
  if (base64Url) {
    imgItemPreview.src = base64Url;
    imgItemPreview.classList.remove("hidden");
    itemPhotoPlaceholder.classList.add("hidden");
    btnRemoveItemPhoto.classList.remove("hidden");
  } else {
    imgItemPreview.src = "";
    imgItemPreview.classList.add("hidden");
    itemPhotoPlaceholder.classList.remove("hidden");
    btnRemoveItemPhoto.classList.add("hidden");
    if (inputItemPhoto) inputItemPhoto.value = "";
    if (inputItemPhotoCamera) inputItemPhotoCamera.value = "";
  }
}

btnRemoveItemPhoto?.addEventListener("click", () => {
  setItemPhotoPreview("");
});

// ============================================================
// RENDER METRIK & VIEW
// ============================================================
function rupiahFormat(num) {
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  if (currentLang === "en") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num || 0);
  }
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num || 0);
}

function renderAllData() {
  renderHomeMetrics();
  renderAssetsView();
  renderMutationsView();
  renderServicesView();
}

function renderHomeMetrics() {
  const session = getCurrentUserSession();
  const name = session ? (session.fullName || "Axentra") : "Axentra";
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";

  if (headerUserName) headerUserName.textContent = name;

  const items = getStoredItems();
  const totalTypes = items.length;
  const totalUnits = items.reduce((acc, x) => acc + Number(x.qty || 0), 0);
  const totalValue = items.reduce((acc, x) => acc + (Number(x.qty || 0) * Number(x.price || 0)), 0);
  
  const roomSet = new Set(items.map(x => x.room).filter(Boolean));
  const totalRooms = roomSet.size;

  const cardAssetValue = document.getElementById("cardAssetValue");
  const cardTotalUnits = document.getElementById("cardTotalUnits");
  const cardTotalTypes = document.getElementById("cardTotalTypes");
  const cardTotalRooms = document.getElementById("cardTotalRooms");

  if (cardAssetValue) cardAssetValue.textContent = rupiahFormat(totalValue);
  if (cardTotalUnits) cardTotalUnits.textContent = totalUnits;
  if (cardTotalTypes) cardTotalTypes.textContent = totalTypes;
  if (cardTotalRooms) cardTotalRooms.textContent = totalRooms;

  const good = items.filter(x => x.condition === "Baik").reduce((acc, x) => acc + Number(x.qty || 0), 0);
  const minor = items.filter(x => x.condition === "Rusak Ringan").reduce((acc, x) => acc + Number(x.qty || 0), 0);
  const major = items.filter(x => x.condition === "Rusak Berat").reduce((acc, x) => acc + Number(x.qty || 0), 0);

  const denom = totalUnits || 1;
  const unitWord = (currentLang === "en") ? "Units" : "Unit";
  const condGoodText = document.getElementById("condGoodText");
  const condMinorText = document.getElementById("condMinorText");
  const condMajorText = document.getElementById("condMajorText");
  const barGood = document.getElementById("barGood");
  const barMinor = document.getElementById("barMinor");
  const barMajor = document.getElementById("barMajor");

  if (condGoodText) condGoodText.textContent = `${good} ${unitWord}`;
  if (condMinorText) condMinorText.textContent = `${minor} ${unitWord}`;
  if (condMajorText) condMajorText.textContent = `${major} ${unitWord}`;

  if (barGood) barGood.style.width = `${(good / denom) * 100}%`;
  if (barMinor) barMinor.style.width = `${(minor / denom) * 100}%`;
  if (barMajor) barMajor.style.width = `${(major / denom) * 100}%`;

  const roomCounts = {};
  items.forEach(x => {
    roomCounts[x.room] = (roomCounts[x.room] || 0) + Number(x.qty || 0);
  });

  const roomGrid = document.getElementById("roomTilesGrid");
  if (roomGrid) {
    roomGrid.innerHTML = Object.entries(roomCounts).map(([room, count]) => `
      <div class="room-tile">
        <span>${room}</span>
        <strong>${count} ${unitWord}</strong>
      </div>
    `).join("") || `<p style='color:var(--text-muted);font-size:12px;'>${(currentLang === "en") ? "No room data yet." : "Belum ada data ruangan."}</p>`;
  }

  if (homeActivityFeed) {
    const mutations = getStoredMutations().slice(0, 2);
    const services = getStoredServices().slice(0, 2);

    let html = "";
    mutations.forEach(m => {
      html += `
        <div class="act-card">
          <div class="act-icon"><i class="fa-solid fa-arrow-right-arrow-left"></i></div>
          <div class="act-details">
            <strong>${(currentLang === "en") ? "Transfer" : "Mutasi"} ${m.qty} ${m.unit} ${m.itemName}</strong>
            <small>${(currentLang === "en") ? "From" : "Dari"} ${m.fromRoom} ${(currentLang === "en") ? "to" : "ke"} ${m.toRoom} • ${m.date}</small>
          </div>
        </div>
      `;
    });

    services.forEach(s => {
      let statusLabel = s.status;
      if (currentLang === "en") {
        if (s.status === "Sedang Dikerjakan") statusLabel = "In Progress";
        if (s.status === "Dalam Antrean") statusLabel = "In Queue";
        if (s.status === "Selesai") statusLabel = "Completed";
      }

      html += `
        <div class="act-card">
          <div class="act-icon"><i class="fa-solid fa-screwdriver-wrench"></i></div>
          <div class="act-details">
            <strong>${(currentLang === "en") ? "Service" : "Servis"} ${s.itemName} (${statusLabel})</strong>
            <small>${s.notes} • ${s.date}</small>
          </div>
        </div>
      `;
    });

    homeActivityFeed.innerHTML = html || `
      <div class="act-card">
        <div class="act-icon"><i class="fa-solid fa-circle-check"></i></div>
        <div class="act-details">
          <strong>${(currentLang === "en") ? "System Ready" : "Sistem Terhubung"}</strong>
          <small>${(currentLang === "en") ? "Database synchronized" : "Proyek Manajemen Inventaris siap digunakan"}</small>
        </div>
      </div>
    `;
  }
}

function renderAssetsView() {
  const allItems = getStoredItems();
  const searchKeyword = (inputSearchAssets?.value || "").toLowerCase().trim();
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  const t = i18nDictionary[currentLang] || i18nDictionary.id;

  const filtered = allItems.filter(item => {
    const matchSearch = `${item.name} ${item.code} ${item.room} ${item.category}`.toLowerCase().includes(searchKeyword);
    const matchCondition = currentActiveFilterCondition === "all" || item.condition === currentActiveFilterCondition;
    return matchSearch && matchCondition;
  });

  assetsEmptyState?.classList.toggle("hidden", filtered.length > 0);

  if (mobileItemsContainer) {
    mobileItemsContainer.innerHTML = filtered.map(item => {
      const imgSrc = item.image || DEFAULT_FALLBACK_IMAGE;

      let condText = item.condition;
      if (currentLang === "en") {
        if (item.condition === "Baik") condText = "Good";
        if (item.condition === "Rusak Ringan") condText = "Minor Damage";
        if (item.condition === "Rusak Berat") condText = "Critical Damage";
      }

      return `
        <div class="item-mobile-card">
          <div class="card-main-info">
            <div class="card-main-info-with-thumb">
              <img src="${imgSrc}" alt="${item.name}" class="card-item-thumb" onerror="this.src='${DEFAULT_FALLBACK_IMAGE}'">
              <div>
                <h4>${item.name}</h4>
                <span>${item.code} • ${item.category}</span>
              </div>
            </div>
            <span class="cond-pill ${item.condition === 'Baik' ? 'good' : (item.condition === 'Rusak Ringan' ? 'warn' : 'danger')}">
              ${condText}
            </span>
          </div>

          <div class="card-details-strip">
            <div><i class="fa-solid fa-door-open" style="margin-right:4px;"></i> ${item.room}</div>
            <div><strong>${item.qty}</strong> ${item.unit}</div>
            <div>${rupiahFormat(item.price)}</div>
          </div>

          <div class="card-actions-row">
            <button type="button" class="btn-card-action" onclick="showItemQrModal('${item.id}')">
              <i class="fa-solid fa-qrcode"></i> QR
            </button>
            <button type="button" class="btn-card-action" onclick="openEditItemForm('${item.id}')">
              <i class="fa-solid fa-pen-to-square"></i> ${t.cardBtnEdit}
            </button>
            <button type="button" class="btn-card-action del" onclick="confirmDeleteItem('${item.id}')">
              <i class="fa-solid fa-trash-can"></i> ${t.cardBtnDelete}
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  if (desktopTableBody) {
    desktopTableBody.innerHTML = filtered.map((item, idx) => {
      const imgSrc = item.image || DEFAULT_FALLBACK_IMAGE;

      let condText = item.condition;
      if (currentLang === "en") {
        if (item.condition === "Baik") condText = "Good";
        if (item.condition === "Rusak Ringan") condText = "Minor Damage";
        if (item.condition === "Rusak Berat") condText = "Critical Damage";
      }

      return `
        <tr>
          <td>${idx + 1}</td>
          <td>
            <img src="${imgSrc}" alt="${item.name}" class="table-item-thumb" onerror="this.src='${DEFAULT_FALLBACK_IMAGE}'">
          </td>
          <td><strong>${item.name}</strong></td>
          <td><span style="color:var(--primary); font-weight:700;">${item.code}</span></td>
          <td>${item.category}</td>
          <td>${item.room}</td>
          <td>${item.qty} ${item.unit}</td>
          <td>
            <span class="cond-pill ${item.condition === 'Baik' ? 'good' : (item.condition === 'Rusak Ringan' ? 'warn' : 'danger')}">
              ${condText}
            </span>
          </td>
          <td style="text-align: right;">
            <div style="display:inline-flex; gap:6px;">
              <button type="button" class="btn-card-action" onclick="showItemQrModal('${item.id}')" title="Detail & QR">
                <i class="fa-solid fa-qrcode"></i>
              </button>
              <button type="button" class="btn-card-action" onclick="openEditItemForm('${item.id}')" title="${t.cardBtnEdit}">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" class="btn-card-action del" onclick="confirmDeleteItem('${item.id}')" title="${t.cardBtnDelete}">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }
}

function renderMutationsView() {
  const mutations = getStoredMutations();
  const items = getStoredItems();
  const searchKeyword = (inputSearchMutations?.value || "").toLowerCase().trim();

  const filtered = mutations.filter(m => 
    `${m.itemName} ${m.itemCode} ${m.fromRoom} ${m.toRoom} ${m.by}`.toLowerCase().includes(searchKeyword)
  );

  mutationsEmptyState?.classList.toggle("hidden", filtered.length > 0);

  if (mutationLogsContainer) {
    mutationLogsContainer.innerHTML = filtered.map(m => {
      const matchedItem = items.find(x => x.code === m.itemCode || x.name.toLowerCase() === m.itemName.toLowerCase());
      const imgSrc = m.image || matchedItem?.image || DEFAULT_FALLBACK_IMAGE;

      return `
        <div class="mutation-card">
          <div class="mutation-card-header">
            <div class="card-header-with-thumb">
              <img src="${imgSrc}" alt="${m.itemName}" class="mutation-item-thumb" onerror="this.src='${DEFAULT_FALLBACK_IMAGE}'">
              <div>
                <h4>${m.itemName}</h4>
                <small>${m.itemCode} • <strong>${m.qty} ${m.unit}</strong></small>
              </div>
            </div>
            <small>${m.date}</small>
          </div>

          <div class="mutation-flow-badge">
            <span class="flow-room">${m.fromRoom}</span>
            <i class="fa-solid fa-arrow-right"></i>
            <span class="flow-room">${m.toRoom}</span>
          </div>

          <div class="mutation-footer-meta">
            <span><i class="fa-regular fa-user"></i> ${m.by}</span>
            <span><em>"${m.notes}"</em></span>
          </div>
        </div>
      `;
    }).join("");
  }
}

function renderServicesView() {
  const services = getStoredServices();
  const items = getStoredItems();
  const searchKeyword = (inputSearchServices?.value || "").toLowerCase().trim();
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  const t = i18nDictionary[currentLang] || i18nDictionary.id;

  const filtered = services.filter(s => {
    const matchSearch = `${s.itemName} ${s.itemCode} ${s.room} ${s.technician} ${s.notes}`.toLowerCase().includes(searchKeyword);
    const matchStatus = currentActiveServiceFilter === "all" || s.status === currentActiveServiceFilter;
    return matchSearch && matchStatus;
  });

  servicesEmptyState?.classList.toggle("hidden", filtered.length > 0);

  if (serviceLogsContainer) {
    serviceLogsContainer.innerHTML = filtered.map(s => {
      let statusClass = "queue";
      let statusLabel = s.status;

      if (s.status === "Sedang Dikerjakan") {
        statusClass = "progress";
        statusLabel = (currentLang === "en") ? "In Progress" : "Sedang Dikerjakan";
      } else if (s.status === "Selesai") {
        statusClass = "done";
        statusLabel = (currentLang === "en") ? "Completed" : "Selesai";
      } else if (s.status === "Dalam Antrean") {
        statusLabel = (currentLang === "en") ? "In Queue" : "Dalam Antrean";
      }

      const matchedItem = items.find(x => x.id === s.itemId || x.code === s.itemCode);
      const imgSrc = s.image || matchedItem?.image || DEFAULT_FALLBACK_IMAGE;

      return `
        <div class="service-card">
          <div class="service-card-header">
            <div class="card-header-with-thumb">
              <img src="${imgSrc}" alt="${s.itemName}" class="service-item-thumb" onerror="this.src='${DEFAULT_FALLBACK_IMAGE}'">
              <div>
                <h4>${s.itemName}</h4>
                <small>${s.itemCode} • ${s.room}</small>
              </div>
            </div>
            <span class="status-pill ${statusClass}">${statusLabel}</span>
          </div>

          <div class="service-actions-strip">
            <div><strong>${t.costLabel}:</strong> ${rupiahFormat(s.cost)}</div>
            <button type="button" class="btn-cycle-status" onclick="openServiceStatusModal('${s.id}')">
              <i class="fa-solid fa-sliders"></i> ${t.changeStatusBtn}
            </button>
          </div>

          <div class="service-footer-meta">
            <span><i class="fa-solid fa-wrench"></i> ${s.technician}</span>
            <span><em>"${s.notes}"</em></span>
          </div>
        </div>
      `;
    }).join("");
  }
}

inputSearchAssets?.addEventListener("input", renderAssetsView);
inputSearchMutations?.addEventListener("input", renderMutationsView);
inputSearchServices?.addEventListener("input", renderServicesView);

filterChips.forEach(chip => {
  chip.addEventListener("click", () => {
    filterChips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    currentActiveFilterCondition = chip.dataset.filter;
    renderAssetsView();
  });
});

serviceFilterChips.forEach(chip => {
  chip.addEventListener("click", () => {
    serviceFilterChips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    currentActiveServiceFilter = chip.dataset.sfilter;
    renderServicesView();
  });
});

// ============================================================
// CRUD ASET
// ============================================================
function openCreateItemForm() {
  formInventoryItem.reset();
  editItemId.value = "";
  setItemPhotoPreview("");
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  itemFormTitle.textContent = (currentLang === "en") ? "Add New Asset" : "Tambah Aset Baru";
  advancedFieldsContainer.classList.add("hidden");
  btnToggleAdvancedFields.classList.remove("open");
  openModalLayer(itemFormModal);
}

qaAdd.addEventListener("click", openCreateItemForm);
btnAsetScreenAdd?.addEventListener("click", openCreateItemForm);

window.openEditItemForm = function(id) {
  const items = getStoredItems();
  const target = items.find(x => x.id === id);
  if (!target) return;

  editItemId.value = target.id;
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  itemFormTitle.textContent = (currentLang === "en") ? "Edit Asset Details" : "Edit Spesifikasi Aset";
  inputItemName.value = target.name;
  inputItemCode.value = target.code;
  selectItemCategory.value = target.category;
  inputItemRoom.value = target.room;
  selectItemCondition.value = target.condition;
  inputItemQty.value = target.qty;
  selectItemUnit.value = target.unit;
  inputItemPrice.value = target.price || 0;
  inputItemSupplier.value = target.supplier || "";
  inputItemNotes.value = target.notes || "";

  setItemPhotoPreview(target.image || "");

  advancedFieldsContainer.classList.remove("hidden");
  btnToggleAdvancedFields.classList.add("open");
  openModalLayer(itemFormModal);
};

btnToggleAdvancedFields.addEventListener("click", () => {
  const isHidden = advancedFieldsContainer.classList.contains("hidden");
  advancedFieldsContainer.classList.toggle("hidden", !isHidden);
  btnToggleAdvancedFields.classList.toggle("open", isHidden);
});

formInventoryItem.addEventListener("submit", async e => {
  e.preventDefault();

  const items = [...getStoredItems()];
  const isEdit = Boolean(editItemId.value);
  const code = inputItemCode.value.trim().toUpperCase();

  if (items.some(x => x.code.toUpperCase() === code && x.id !== editItemId.value)) {
    showToast(`Kode aset [${code}] sudah dipakai barang lain!`);
    return;
  }

  const payload = {
    name: inputItemName.value.trim(),
    code: code,
    category: selectItemCategory.value,
    room: inputItemRoom.value.trim(),
    condition: selectItemCondition.value,
    qty: Number(inputItemQty.value) || 1,
    unit: selectItemUnit.value,
    price: Number(inputItemPrice.value) || 0,
    supplier: inputItemSupplier.value.trim() || "-",
    notes: inputItemNotes.value.trim() || "-",
    image: itemImageBase64.value || DEFAULT_FALLBACK_IMAGE
  };

  if (isEdit) {
    const idx = items.findIndex(x => x.id === editItemId.value);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...payload };
      showToast(`Aset [${payload.name}] berhasil diperbarui!`);
    }
  } else {
    const newItem = { id: Date.now().toString(), ...payload };
    items.unshift(newItem);
    showToast(`Aset [${payload.name}] berhasil dicatat!`);
  }

  await saveItemsData(items);
  renderAllData();
  closeModalDirectly(itemFormModal);
});

window.confirmDeleteItem = function(id) {
  const items = getStoredItems();
  const target = items.find(x => x.id === id);
  if (!target) return;

  itemPendingDeleteId = id;
  document.getElementById("delItemName").textContent = target.name;
  document.getElementById("delItemCode").textContent = target.code;
  openModalLayer(deleteConfirmModal);
};

btnExecuteDelete.addEventListener("click", async () => {
  if (!itemPendingDeleteId) return;

  let items = getStoredItems();
  const deletedItem = items.find(x => x.id === itemPendingDeleteId);
  items = items.filter(x => x.id !== itemPendingDeleteId);

  if (!isGuestSession()) {
    if (navigator.onLine && supabaseClient) {
      try {
        await supabaseClient.from("items").delete().eq("id", itemPendingDeleteId);
      } catch (e) {
        pushToSyncQueue("delete", "items", { id: itemPendingDeleteId });
      }
    } else {
      pushToSyncQueue("delete", "items", { id: itemPendingDeleteId });
    }
  }

  await saveItemsData(items);
  showToast(`Aset [${deletedItem?.name || 'Barang'}] berhasil dihapus`);
  itemPendingDeleteId = null;
  renderAllData();
  closeModalDirectly(deleteConfirmModal);
});

window.showItemQrModal = function(id) {
  const items = getStoredItems();
  const target = items.find(x => x.id === id);
  if (!target) return;

  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  currentQrDisplayItem = target;
  document.getElementById("qrDisplayName").textContent = target.name;
  document.getElementById("qrDisplayCode").textContent = target.code;
  document.getElementById("qrDisplayRoom").textContent = target.room;

  detailItemPhotoImg.src = target.image || DEFAULT_FALLBACK_IMAGE;

  let condText = target.condition;
  if (currentLang === "en") {
    if (target.condition === "Baik") condText = "Good";
    if (target.condition === "Rusak Ringan") condText = "Minor Damage";
    if (target.condition === "Rusak Berat") condText = "Critical Damage";
  }

  const badge = document.getElementById("qrDisplayBadge");
  badge.textContent = condText;
  badge.className = `cond-pill ${target.condition === 'Baik' ? 'good' : (target.condition === 'Rusak Ringan' ? 'warn' : 'danger')}`;

  const lblCategory = (currentLang === "en") ? "Category" : "Kategori";
  const lblStock = (currentLang === "en") ? "Quantity" : "Stok";
  const lblPrice = (currentLang === "en") ? "Purchase Price" : "Harga Beli";
  const lblVendor = (currentLang === "en") ? "Vendor / Supplier" : "Vendor";
  const lblNotes = (currentLang === "en") ? "Notes" : "Keterangan";

  document.getElementById("qrInfoList").innerHTML = `
    <div class="qr-info-row"><span>${lblCategory}</span><strong>${target.category}</strong></div>
    <div class="qr-info-row"><span>${lblStock}</span><strong>${target.qty} ${target.unit}</strong></div>
    <div class="qr-info-row"><span>${lblPrice}</span><strong>${rupiahFormat(target.price)}</strong></div>
    <div class="qr-info-row"><span>${lblVendor}</span><strong>${target.supplier}</strong></div>
    <div class="qr-info-row"><span>${lblNotes}</span><strong>${target.notes}</strong></div>
  `;

  const qrContainer = document.getElementById("qrCanvasContainer");
  qrContainer.innerHTML = "";

  const scanPayloadUrl = `${window.location.origin}${window.location.pathname}?item=${encodeURIComponent(target.code)}`;
  if (typeof QRCode !== "undefined") {
    new QRCode(qrContainer, {
      text: scanPayloadUrl,
      width: 140,
      height: 140,
      colorDark: "#0f172a",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  openModalLayer(qrDetailModal);
};

btnDownloadQr.addEventListener("click", () => {
  if (!currentQrDisplayItem) return;
  const canvas = document.querySelector("#qrCanvasContainer canvas");
  const img = document.querySelector("#qrCanvasContainer img");
  const url = canvas?.toDataURL("image/png") || img?.src;
  if (!url) return;

  const a = document.createElement("a");
  a.href = url;
  a.download = `QR_${currentQrDisplayItem.code}.png`;
  a.click();
  showToast("Gambar stiker QR diunduh");
});

btnPrintQr.addEventListener("click", () => {
  if (!currentQrDisplayItem) return;
  const canvas = document.querySelector("#qrCanvasContainer canvas");
  const img = document.querySelector("#qrCanvasContainer img");
  const src = canvas?.toDataURL("image/png") || img?.src;
  
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`
    <html>
      <head>
        <title>Cetak QR - ${currentQrDisplayItem.code}</title>
        <style>
          body { text-align: center; font-family: sans-serif; padding: 20px; }
          .label-box { border: 2px dashed #000; display: inline-block; padding: 16px; border-radius: 12px; }
          h3 { margin: 0 0 4px; font-size: 16px; }
          p { margin: 0 0 10px; font-size: 12px; color: #555; }
        </style>
      </head>
      <body>
        <div class="label-box">
          <h3>${currentQrDisplayItem.name}</h3>
          <p>${currentQrDisplayItem.code} • ${currentQrDisplayItem.room}</p>
          <img src="${src}" style="width: 160px; height: 160px;">
          <p style="margin-top: 8px;">PT NusaTech Digital Indonesia</p>
        </div>
        <script>window.onload = () => window.print();<\/script>
      </body>
    </html>
  `);
  w.document.close();
});

// ============================================================
// MUTASI & SERVIS
// ============================================================
function openMutationModal() {
  selectedMutateItemId.value = "";
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  lblSelectedItemName.textContent = (currentLang === "en") ? "Choose an inventory item..." : "Pilih barang inventaris...";
  lblSelectedItemName.classList.add("placeholder-text");
  lblMutateSourceRoom.textContent = "-";
  lblMutateSourceQty.textContent = "0";
  inputMutateQty.value = 1;
  inputMutateDestRoom.value = "";
  inputMutateNotes.value = "";

  openModalLayer(mutationFormModal);
}

btnTriggerItemPicker?.addEventListener("click", () => {
  currentPickerMode = "mutation";
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  pickerSheetTitle.textContent = (currentLang === "en") ? "Select Asset to Move" : "Pilih Aset untuk Mutasi";
  pickerSheetSubtitle.textContent = (currentLang === "en") ? "Tap item you want to transfer" : "Sentuh barang yang hendak dipindahkan";
  renderPickerItems(getStoredItems());
  openModalLayer(itemPickerModal);
});

function openServiceModal() {
  selectedServiceItemId.value = "";
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  lblSelectedServiceItemName.textContent = (currentLang === "en") ? "Select damaged asset..." : "Pilih aset yang rusak...";
  lblSelectedServiceItemName.classList.add("placeholder-text");
  inputServiceTech.value = "Tim IT Support";
  selectServiceStatus.value = "Sedang Dikerjakan";
  inputServiceCost.value = "";
  inputServiceNotes.value = "";

  openModalLayer(serviceFormModal);
}

btnTriggerServiceItemPicker?.addEventListener("click", () => {
  currentPickerMode = "service";
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  pickerSheetTitle.textContent = (currentLang === "en") ? "Select Asset for Service" : "Pilih Aset untuk Servis";
  pickerSheetSubtitle.textContent = (currentLang === "en") ? "Choose equipment with technical issues" : "Pilih barang yang mengalami kendala teknis";
  renderPickerItems(getStoredItems());
  openModalLayer(itemPickerModal);
});

function renderPickerItems(items) {
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  if (items.length === 0) {
    pickerItemsList.innerHTML = `<p style='text-align:center;color:var(--text-muted);font-size:12px;'>${(currentLang === "en") ? "No items available." : "Belum ada data barang."}</p>`;
    return;
  }

  pickerItemsList.innerHTML = items.map(item => `
    <div class="picker-item-card" onclick="handleItemPicked('${item.id}')">
      <div class="picker-item-info">
        <strong>${item.name}</strong>
        <small>${item.code} • ${item.room} (${item.condition})</small>
      </div>
      <div class="picker-item-stock">
        ${item.qty} ${item.unit}
      </div>
    </div>
  `).join("");
}

window.handleItemPicked = function(id) {
  const items = getStoredItems();
  const selected = items.find(x => x.id === id);
  if (!selected) return;

  if (currentPickerMode === "mutation") {
    selectedMutateItemId.value = selected.id;
    lblSelectedItemName.textContent = `${selected.name} (${selected.code})`;
    lblSelectedItemName.classList.remove("placeholder-text");
    lblMutateSourceRoom.textContent = selected.room;
    lblMutateSourceQty.textContent = selected.qty;
    inputMutateQty.max = selected.qty;
  } else {
    selectedServiceItemId.value = selected.id;
    lblSelectedServiceItemName.textContent = `${selected.name} (${selected.code}) - ${selected.room}`;
    lblSelectedServiceItemName.classList.remove("placeholder-text");
  }

  closeModalDirectly(itemPickerModal);
};

btnOpenMutasiModal?.addEventListener("click", openMutationModal);
qaMutate?.addEventListener("click", openMutationModal);
btnOpenServiceModal?.addEventListener("click", openServiceModal);

formMutation?.addEventListener("submit", async e => {
  e.preventDefault();

  const targetId = selectedMutateItemId.value;
  if (!targetId) {
    showToast("Pilih barang yang hendak dipindahkan terlebih dahulu!");
    return;
  }

  const items = [...getStoredItems()];
  const moveQty = Number(inputMutateQty.value);
  const destRoom = inputMutateDestRoom.value.trim();
  const notes = inputMutateNotes.value.trim() || "-";

  const sourceIndex = items.findIndex(x => x.id === targetId);
  if (sourceIndex === -1) {
    showToast("Aset tidak ditemukan!");
    return;
  }

  const sourceItem = items[sourceIndex];

  if (moveQty > sourceItem.qty) {
    showToast(`Jumlah melebihi stok tersedia (${sourceItem.qty} unit)!`);
    return;
  }

  if (sourceItem.room.toLowerCase() === destRoom.toLowerCase()) {
    showToast("Ruangan tujuan tidak boleh sama dengan ruangan asal!");
    return;
  }

  const originRoomName = sourceItem.room;

  if (moveQty === sourceItem.qty) {
    sourceItem.room = destRoom;
  } else {
    sourceItem.qty -= moveQty;

    const existingInDest = items.find(x => 
      x.name.toLowerCase() === sourceItem.name.toLowerCase() && 
      x.room.toLowerCase() === destRoom.toLowerCase()
    );

    if (existingInDest) {
      existingInDest.qty += moveQty;
    } else {
      const splitItem = {
        ...sourceItem,
        id: Date.now().toString(),
        code: `${sourceItem.code}-M`,
        room: destRoom,
        qty: moveQty
      };
      items.push(splitItem);
    }
  }

  await saveItemsData(items);

  const session = getCurrentUserSession();
  const officerName = session ? (session.fullName || "Axentra") : "Axentra";
  const now = new Date();
  const timeStr = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'short' })} ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const mutations = [...getStoredMutations()];
  mutations.unshift({
    id: `m-${Date.now()}`,
    itemName: sourceItem.name,
    itemCode: sourceItem.code,
    qty: moveQty,
    unit: sourceItem.unit,
    fromRoom: originRoomName,
    toRoom: destRoom,
    date: timeStr,
    by: officerName,
    notes: notes,
    image: sourceItem.image || DEFAULT_FALLBACK_IMAGE
  });
  await saveMutationsData(mutations);

  showToast(`Berhasil memindahkan ${moveQty} ${sourceItem.unit} ke ${destRoom}!`);
  renderAllData();
  closeModalDirectly(mutationFormModal);
  switchTabView("mutasi");
});

formService?.addEventListener("submit", async e => {
  e.preventDefault();

  const targetId = selectedServiceItemId.value;
  if (!targetId) {
    showToast("Pilih barang yang hendak diservis terlebih dahulu!");
    return;
  }

  const items = [...getStoredItems()];
  const targetItem = items.find(x => x.id === targetId);
  if (!targetItem) {
    showToast("Data barang tidak ditemukan!");
    return;
  }

  const tech = inputServiceTech.value.trim() || "Tim IT Support";
  const status = selectServiceStatus.value;
  const cost = Number(inputServiceCost.value) || 0;
  const notes = inputServiceNotes.value.trim();

  if (status !== "Selesai" && targetItem.condition === "Baik") {
    targetItem.condition = "Rusak Ringan";
    await saveItemsData(items);
  }

  const now = new Date();
  const timeStr = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'short' })} ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const services = [...getStoredServices()];
  services.unshift({
    id: `s-${Date.now()}`,
    itemId: targetItem.id,
    itemName: targetItem.name,
    itemCode: targetItem.code,
    room: targetItem.room,
    technician: tech,
    status: status,
    cost: cost,
    notes: notes,
    date: timeStr,
    image: targetItem.image || DEFAULT_FALLBACK_IMAGE
  });
  await saveServicesData(services);

  showToast(`Catatan servis untuk [${targetItem.name}] disimpan!`);
  renderAllData();
  closeModalDirectly(serviceFormModal);
  switchTabView("servis");
});

window.openServiceStatusModal = function(serviceId) {
  const services = getStoredServices();
  const current = services.find(x => x.id === serviceId);
  if (!current) return;

  activeServiceTargetId = serviceId;
  lblStatusChangeItemTitle.textContent = `${current.itemName} (${current.itemCode})`;
  openModalLayer(serviceStatusModal);
};

window.applyServiceStatusChange = async function(newStatus) {
  if (!activeServiceTargetId) return;

  const services = [...getStoredServices()];
  const current = services.find(x => x.id === activeServiceTargetId);
  if (!current) return;

  current.status = newStatus;

  if (newStatus === "Selesai") {
    const items = [...getStoredItems()];
    const itemTarget = items.find(x => x.id === current.itemId || x.code === current.itemCode);
    if (itemTarget) {
      itemTarget.condition = "Baik";
      await saveItemsData(items);
      showToast(`Status Selesai! Kondisi [${itemTarget.name}] kini pulih Siap Pakai.`);
    }
  }

  await saveServicesData(services);
  renderAllData();
  closeModalDirectly(serviceStatusModal);
  showToast(`Status diperbarui menjadi "${newStatus}"`);
};

// ============================================================
// BACKUP & RESTORE JSON
// ============================================================
btnBackupDatabase?.addEventListener("click", () => {
  const fullBackup = {
    app: "NusaTech",
    organization: "PT NusaTech Digital Indonesia",
    team: "Axentra",
    timestamp: new Date().toISOString(),
    items: getStoredItems(),
    mutations: getStoredMutations(),
    services: getStoredServices()
  };

  const jsonStr = JSON.stringify(fullBackup, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const now = new Date();
  a.href = url;
  a.download = `Backup_NusaTech_Axentra_${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Database berhasil dicadangkan ke file JSON!");
});

inputRestoreDatabase?.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!data.items || !Array.isArray(data.items)) {
        throw new Error("Format JSON tidak valid");
      }

      await saveItemsData(data.items);
      if (data.mutations) await saveMutationsData(data.mutations);
      if (data.services) await saveServicesData(data.services);

      renderAllData();
      showToast("Database berhasil dipulihkan dari file JSON!");
    } catch (err) {
      showToast("Gagal memulihkan: Format file tidak sesuai!");
    }
  };
  reader.readAsText(file);
});

// ============================================================
// EKSPOR LAPORAN
// ============================================================
window.openExportReportModal = function() {
  openModalLayer(exportReportModal);
};

qaReport?.addEventListener("click", openExportReportModal);

window.exportDataToCsv = function(type) {
  let csvContent = "\uFEFF";
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
  let filename = `NusaTech_${type}_${dateStr}.csv`;

  if (type === "items") {
    const items = getStoredItems();
    csvContent += "No,Kode Aset,Nama Barang,Kategori,Ruangan,Kondisi,Jumlah,Satuan,Harga Satuan (Rp),Total Nilai (Rp),Vendor,Catatan\n";
    items.forEach((x, idx) => {
      const total = Number(x.qty || 0) * Number(x.price || 0);
      csvContent += `"${idx+1}","${x.code}","${x.name}","${x.category}","${x.room}","${x.condition}","${x.qty}","${x.unit}","${x.price}","${total}","${x.supplier || '-'}","${x.notes || '-'}"\n`;
    });
  } else if (type === "mutations") {
    const mutations = getStoredMutations();
    csvContent += "No,Kode Aset,Nama Barang,Jumlah,Satuan,Ruang Asal,Ruang Tujuan,Waktu Mutasi,Petugas,Keterangan\n";
    mutations.forEach((x, idx) => {
      csvContent += `"${idx+1}","${x.itemCode}","${x.itemName}","${x.qty}","${x.unit}","${x.fromRoom}","${x.toRoom}","${x.date}","${x.by}","${x.notes || '-'}"\n`;
    });
  } else if (type === "services") {
    const services = getStoredServices();
    csvContent += "No,Kode Aset,Nama Barang,Ruangan,Status,Biaya (Rp),Teknisi,Tanggal,Catatan Kerusakan\n";
    services.forEach((x, idx) => {
      csvContent += `"${idx+1}","${x.itemCode}","${x.itemName}","${x.room}","${x.status}","${x.cost}","${x.technician}","${x.date}","${x.notes || '-'}"\n`;
    });
  }

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`File spreadsheet [${filename}] berhasil diunduh!`);
};

window.printOfficialReport = function(type) {
  const w = window.open("", "_blank");
  if (!w) return;

  const now = new Date();
  const dateFormatted = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'long' })} ${now.getFullYear()}`;
  let title = "LAPORAN INVENTARIS ASET";
  let tableHeaders = "";
  let tableRows = "";

  if (type === "items") {
    title = "BUKU INDUK INVENTARIS SARANA & PRASARANA";
    tableHeaders = "<th>No</th><th>Kode</th><th>Nama Barang</th><th>Kategori</th><th>Lokasi Ruang</th><th>Stok</th><th>Kondisi</th><th>Harga Satuan</th><th>Total Nilai</th>";
    const items = getStoredItems();
    items.forEach((x, idx) => {
      tableRows += `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td>${x.code}</td>
          <td><strong>${x.name}</strong></td>
          <td>${x.category}</td>
          <td>${x.room}</td>
          <td style="text-align:center;">${x.qty} ${x.unit}</td>
          <td>${x.condition}</td>
          <td>${rupiahFormat(x.price)}</td>
          <td><strong>${rupiahFormat(Number(x.qty || 0) * Number(x.price || 0))}</strong></td>
        </tr>
      `;
    });
  } else if (type === "mutations") {
    title = "LAPORAN BERKALA MUTASI BARANG RUANGAN";
    tableHeaders = "<th>No</th><th>Kode</th><th>Nama Barang</th><th>Unit</th><th>Ruang Asal</th><th>Ruang Tujuan</th><th>Waktu Mutasi</th><th>Petugas</th>";
    const mutations = getStoredMutations();
    mutations.forEach((x, idx) => {
      tableRows += `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td>${x.itemCode}</td>
          <td><strong>${x.itemName}</strong></td>
          <td style="text-align:center;">${x.qty} ${x.unit}</td>
          <td>${x.fromRoom}</td>
          <td>${x.toRoom}</td>
          <td>${x.date}</td>
          <td>${x.by}</td>
        </tr>
      `;
    });
  } else if (type === "services") {
    title = "REKAPITULASI PEMELIHARAAN & BIAYA SERVIS ASET";
    tableHeaders = "<th>No</th><th>Kode</th><th>Nama Barang</th><th>Lokasi</th><th>Status</th><th>Biaya Servis</th><th>Teknisi</th><th>Tanggal</th>";
    const services = getStoredServices();
    services.forEach((x, idx) => {
      tableRows += `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td>${x.itemCode}</td>
          <td><strong>${x.itemName}</strong></td>
          <td>${x.room}</td>
          <td>${x.status}</td>
          <td>${rupiahFormat(x.cost)}</td>
          <td>${x.technician}</td>
          <td>${x.date}</td>
        </tr>
      `;
    });
  }

  w.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
          .kop-surat { border-bottom: 3px double #000; padding-bottom: 12px; margin-bottom: 20px; text-align: center; }
          .kop-surat h2 { margin: 0; font-size: 20px; letter-spacing: 0.5px; }
          .kop-surat h4 { margin: 4px 0; font-size: 14px; font-weight: 600; color: #2563eb; }
          .kop-surat small { font-size: 11px; color: #444; }
          .report-meta { display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 32px; }
          th, td { border: 1px solid #333; padding: 7px 9px; }
          th { background: #f0f0f0; text-transform: uppercase; font-size: 10px; }
          .signature-box { display: flex; justify-content: space-between; margin-top: 40px; font-size: 12px; }
          .sig-col { text-align: center; width: 220px; }
          .sig-line { margin-top: 60px; border-bottom: 1px solid #000; }
        </style>
      </head>
      <body>
        <div class="kop-surat">
          <h2>PT NUSATECH DIGITAL INDONESIA</h2>
          <h4>SISTEM MANAJEMEN INVENTARIS ASET • NUSATECH</h4>
          <small>Developed by Team Axentra • IT Infrastructure & Asset Division</small>
        </div>

        <h3 style="text-align: center; font-size: 14px; margin-bottom: 16px; text-decoration: underline;">
          ${title}
        </h3>

        <div class="report-meta">
          <span>Tanggal Cetak: ${dateFormatted}</span>
          <span>Dokumen Resmi Perusahaan</span>
        </div>

        <table>
          <thead><tr>${tableHeaders}</tr></thead>
          <tbody>${tableRows}</tbody>
        </table>

        <div class="signature-box">
          <div class="sig-col">
            <p>Mengetahui,<br>Head of Operations</p>
            <div class="sig-line"></div>
            <p style="margin-top: 4px;">PT NusaTech Digital Indonesia</p>
          </div>
          <div class="sig-col">
            <p>Petugas Verifikasi Aset,<br>Team Axentra</p>
            <div class="sig-line"></div>
            <p style="margin-top: 4px;">IT Asset Custodian</p>
          </div>
        </div>

        <script>window.onload = () => window.print();<\/script>
      </body>
    </html>
  `);
  w.document.close();
};

// ============================================================
// KAMERA SCANNER
// ============================================================
qaScan.addEventListener("click", startFullscreenScanner);
btnExitScanner.addEventListener("click", () => closeModalDirectly(fullscreenScanner));

function startFullscreenScanner() {
  if (typeof Html5Qrcode === "undefined") {
    showToast("Library scanner kamera belum siap!");
    return;
  }

  openModalLayer(fullscreenScanner);
  html5QrScannerInstance = new Html5Qrcode("qrReaderViewport");

  html5QrScannerInstance.start(
    { facingMode: "environment" },
    { fps: 15 },
    decodedText => {
      stopFullscreenScanner();
      closeModalDirectly(fullscreenScanner);

      let scannedCode = decodedText;
      if (decodedText.includes("item=")) {
        try {
          const urlObj = new URL(decodedText);
          scannedCode = urlObj.searchParams.get("item") || decodedText;
        } catch {
          scannedCode = decodedText.split("item=")[1]?.split("&")[0] || decodedText;
        }
      }

      const items = getStoredItems();
      const match = items.find(x => x.code.toLowerCase() === scannedCode.trim().toLowerCase());

      if (match) {
        showToast(`Ditemukan: ${match.name}`);
        setTimeout(() => showItemQrModal(match.id), 300);
      } else {
        showToast(`Kode aset [${scannedCode}] belum terdaftar.`);
      }
    },
    () => {}
  ).catch(err => {
    showToast("Kamera tidak dapat diakses.");
    closeModalDirectly(fullscreenScanner);
  });
}

function stopFullscreenScanner() {
  if (html5QrScannerInstance) {
    html5QrScannerInstance.stop().then(() => {
      html5QrScannerInstance.clear();
      html5QrScannerInstance = null;
    }).catch(() => { html5QrScannerInstance = null; });
  }
}

// ============================================================
// ONBOARDING & AUTENTIKASI RESMI
// ============================================================
function updateSlide(index) {
  currentSlideIndex = index;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));

  if (index === slides.length - 1) {
    btnNextOnboarding.innerHTML = '<span>Mulai Sekarang</span> <i class="fa-solid fa-check"></i>';
  } else {
    btnNextOnboarding.innerHTML = '<span>Lanjut</span> <i class="fa-solid fa-arrow-right"></i>';
  }
}

btnNextOnboarding.addEventListener("click", () => {
  if (currentSlideIndex < slides.length - 1) {
    updateSlide(currentSlideIndex + 1);
  } else {
    localStorage.setItem(KEY_HAS_ONBOARDED, "true");
    showScreen("gate");
  }
});

btnSkipOnboarding.addEventListener("click", () => {
  localStorage.setItem(KEY_HAS_ONBOARDED, "true");
  showScreen("gate");
});

function getRememberedAccounts() {
  try {
    return JSON.parse(localStorage.getItem(KEY_REMEMBERED_ACCOUNTS)) || [];
  } catch { return []; }
}

function saveRememberedAccount(account) {
  let list = getRememberedAccounts();
  list = list.filter(a => a.email !== account.email);
  list.unshift(account);
  localStorage.setItem(KEY_REMEMBERED_ACCOUNTS, JSON.stringify(list.slice(0, 5)));
}

function openAuthModal(mode) {
  currentAuthMode = mode;
  hideAlert();
  openModalLayer(authModal);

  if (mode === "login") {
    authTitle.textContent = "Masuk Sistem";
    authSubtitle.textContent = "Akses database cloud inventaris PT NusaTech";
    authSubmitText.textContent = "Masuk Sekarang";
    authHeaderIcon.className = "fa-solid fa-arrow-right-to-bracket";
    fieldUsername.classList.add("hidden");
    inputUsername.required = false;
    authToggleText.textContent = "Belum punya akun?";
    btnSwitchAuthMode.textContent = "Daftar Akun Baru";
  } else {
    authTitle.textContent = "Daftar Akun Baru";
    authSubtitle.textContent = "Buat akun staf NusaTech untuk mulai mengelola aset";
    authSubmitText.textContent = "Daftar & Masuk";
    authHeaderIcon.className = "fa-solid fa-user-plus";
    fieldUsername.classList.remove("hidden");
    inputUsername.required = true;
    authToggleText.textContent = "Sudah punya akun?";
    btnSwitchAuthMode.textContent = "Masuk di sini";
  }
}

btnSwitchAccount?.addEventListener("click", () => {
  const accounts = getRememberedAccounts();
  
  if (accounts.length === 0) {
    openAuthModal("login");
    return;
  }

  switchAccountsList.innerHTML = accounts.map(acc => {
    const initial = (acc.fullName || "N").charAt(0).toUpperCase();
    const avatarHtml = acc.avatar 
      ? `<img src="${acc.avatar}">` 
      : `<span>${initial}</span>`;

    return `
      <div class="saved-acc-tile" onclick="selectAccountToSwitch('${acc.email}')">
        <div class="acc-tile-left">
          <div class="acc-tile-avatar">${avatarHtml}</div>
          <div class="acc-tile-meta">
            <strong>${acc.fullName}</strong>
            <small>${acc.email}</small>
          </div>
        </div>
        <i class="fa-solid fa-chevron-right" style="color:var(--text-muted); font-size:12px;"></i>
      </div>
    `;
  }).join("");

  openModalLayer(switchAccountModal);
});

window.selectAccountToSwitch = async function(email) {
  const accounts = getRememberedAccounts();
  const target = accounts.find(a => a.email === email);
  if (!target) return;

  localStorage.setItem(KEY_SESSION_USER, JSON.stringify(target));
  closeModalDirectly(switchAccountModal);
  await fetchAllActiveData();
  renderUserProfileHeader();
  renderAllData();
  showToast(`Beralih ke akun: ${target.fullName}`);
};

btnAddNewAccountTrigger?.addEventListener("click", () => {
  closeModalDirectly(switchAccountModal);
  setTimeout(() => openAuthModal("register"), 200);
});

btnGateLogin.addEventListener("click", () => openAuthModal("login"));
btnGateRegister.addEventListener("click", () => openAuthModal("register"));
btnSwitchAuthMode.addEventListener("click", () => openAuthModal(currentAuthMode === "login" ? "register" : "login"));

function showAlert(message, type = "error") {
  authAlert.textContent = message;
  authAlert.className = `auth-alert ${type}`;
  authAlert.classList.remove("hidden");
}

function hideAlert() {
  authAlert.classList.add("hidden");
  authAlert.textContent = "";
}

// FORM SUBMIT MANUAL (LOGIN / DAFTAR TERSIMPAN KE TABEL 'users')
authForm.addEventListener("submit", async e => {
  e.preventDefault();
  hideAlert();

  const email = inputEmail.value.trim().toLowerCase();
  const password = inputPassword.value;

  if (password.length < 5) {
    showAlert("Kata sandi minimal 5 karakter!");
    return;
  }

  if (currentAuthMode === "register") {
    const fullName = inputUsername.value.trim();
    if (!fullName) {
      showAlert("Username tidak boleh kosong!");
      return;
    }

    if (supabaseClient && navigator.onLine) {
      try {
        const { data: existingUser } = await supabaseClient.from("users").select("id").eq("email", email).maybeSingle();
        if (existingUser) {
          showAlert("Email sudah terdaftar! Silakan beralih ke menu Masuk.");
          return;
        }

        const newUserPayload = {
          id: "usr-" + Date.now(),
          username: fullName,
          email: email,
          password: password,
          role: "PT NusaTech Digital Indonesia",
          avatar: "",
          auth_provider: "manual",
          created_at: new Date().toISOString(),
          last_sign_in: new Date().toISOString()
        };

        await supabaseClient.from("users").insert([newUserPayload]);

        const sessionData = {
          fullName: fullName,
          email: email,
          role: "PT NusaTech Digital Indonesia",
          avatar: "",
          isGuest: false
        };

        saveRememberedAccount(sessionData);
        localStorage.setItem(KEY_SESSION_USER, JSON.stringify(sessionData));

        showAlert("Pendaftaran berhasil!", "success");
        setTimeout(async () => {
          closeModalDirectly(authModal);
          await fetchAllActiveData();
          showScreen("app");
        }, 400);
        return;
      } catch (err) {
        console.warn("Gagal simpan user ke Supabase:", err);
      }
    }

    // Fallback Offline Register
    const fallbackUser = {
      fullName: fullName,
      email: email,
      role: "PT NusaTech Digital Indonesia",
      avatar: "",
      isGuest: false
    };
    saveRememberedAccount(fallbackUser);
    localStorage.setItem(KEY_SESSION_USER, JSON.stringify(fallbackUser));
    showAlert("Berhasil terdaftar (Lokal)!", "success");
    setTimeout(async () => {
      closeModalDirectly(authModal);
      await fetchAllActiveData();
      showScreen("app");
    }, 400);

  } else {
    // Mode Login
    if (supabaseClient && navigator.onLine) {
      try {
        const { data: userRecord } = await supabaseClient
          .from("users")
          .select("*")
          .eq("email", email)
          .maybeSingle();

        if (!userRecord || userRecord.password !== password) {
          showAlert("Email atau kata sandi tidak cocok!");
          return;
        }

        await supabaseClient.from("users").update({ last_sign_in: new Date().toISOString() }).eq("id", userRecord.id);

        const activeSession = {
          fullName: userRecord.username || email.split("@")[0],
          email: userRecord.email,
          role: userRecord.role || "PT NusaTech Digital Indonesia",
          avatar: userRecord.avatar || "",
          isGuest: false
        };

        saveRememberedAccount(activeSession);
        localStorage.setItem(KEY_SESSION_USER, JSON.stringify(activeSession));

        showAlert("Berhasil masuk!", "success");
        setTimeout(async () => {
          closeModalDirectly(authModal);
          await fetchAllActiveData();
          showScreen("app");
        }, 400);
        return;
      } catch (err) {
        console.warn("Pengecekan login error:", err);
      }
    }

    // Fallback Offline Login
    const remembered = getRememberedAccounts();
    const matched = remembered.find(a => a.email === email);
    const activeSession = {
      fullName: matched ? matched.fullName : email.split("@")[0],
      email: email,
      role: "PT NusaTech Digital Indonesia",
      avatar: matched ? matched.avatar : "",
      isGuest: false
    };

    saveRememberedAccount(activeSession);
    localStorage.setItem(KEY_SESSION_USER, JSON.stringify(activeSession));

    showAlert("Berhasil masuk!", "success");
    setTimeout(async () => {
      closeModalDirectly(authModal);
      await fetchAllActiveData();
      showScreen("app");
    }, 400);
  }
});

// ============================================================
// LOGIN / DAFTAR RESMI DENGAN GOOGLE OAUTH
// ============================================================
btnGoogleAuth?.addEventListener("click", async () => {
  if (!supabaseClient) {
    showToast("Koneksi Supabase belum siap!");
    return;
  }

  showToast("Mengarahkan ke Akun Google...");

  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname
    }
  });

  if (error) {
    showToast("Gagal: " + error.message);
  }
});

// MODE TAMU SEMENTARA
btnGateGuest.addEventListener("click", async () => {
  localStorage.setItem(KEY_SESSION_USER, JSON.stringify({
    fullName: "Tamu Eksplorasi",
    email: "tamu@nusatech.co.id",
    role: "Mode Tamu (Sementara)",
    avatar: "",
    isGuest: true
  }));
  await fetchAllActiveData();
  showScreen("app");
  showToast("Mode Tamu Aktif: Data sementara tidak disimpan ke Cloud");
});

function triggerLogoutModal() {
  openModalLayer(logoutConfirmModal);
}

btnLogout?.addEventListener("click", triggerLogoutModal);
btnSidebarLogout?.addEventListener("click", triggerLogoutModal);

btnExecuteLogout?.addEventListener("click", () => {
  if (isGuestSession()) {
    localStorage.removeItem(KEY_GUEST_ITEMS);
    localStorage.removeItem(KEY_GUEST_MUTATIONS);
    localStorage.removeItem(KEY_GUEST_SERVICES);
  }

  localStorage.removeItem(KEY_SESSION_USER);
  inMemoryItems = [];
  inMemoryMutations = [];
  inMemoryServices = [];

  closeModalDirectly(logoutConfirmModal);
  showScreen("gate");
  showToast("Berhasil keluar sesi");
});

btnSeedDefaultData?.addEventListener("click", async () => {
  const currentLang = localStorage.getItem(KEY_LANGUAGE) || "id";
  const msg = (currentLang === "en") ? "Load NusaTech sample simulation data?" : "Muat data inventaris simulasi NusaTech?";
  
  if (confirm(msg)) {
    await saveItemsData(demoSimulationItems);
    renderAllData();
    showToast((currentLang === "en") ? "Simulation data loaded!" : "Data simulasi berhasil dimuat!");
  }
});

document.addEventListener("DOMContentLoaded", initAppFlow);