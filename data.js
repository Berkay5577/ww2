// WW2Archive — Kapsamlı II. Dünya Savaşı Ansiklopedisi Veri Seti
// 2-dunya-savasi-site-mimarisi.md şemasına uygun olarak modellenmiştir.

const WW2_DATA = {
    statistics: {
        totalCasualties: "70M - 85M",
        durationYears: "6 Yıl (1939 - 1945)",
        participatingNations: "30+ Ülke",
        majorFronts: "4 Ana Cephe",
        totalBattles: "50+ Büyük Muharebe"
    },

    fronts: [
        { id: "all", name: "Tüm Cepheler", icon: "fa-globe" },
        { id: "avrupa", name: "Batı / Avrupa Cephesi", icon: "fa-shield-halved", desc: "Fransa, Britanya ve Normandiya çıkarmasını kapsayan batı harekâtları." },
        { id: "dogu", name: "Doğu Cephesi (Sovyet-Alman)", icon: "fa-skull-crossbones", desc: "Tarihin en büyük ve en kanlı kara savaşlarına sahne olan cephe." },
        { id: "pasifik", name: "Pasifik & Asya Cephesi", icon: "fa-water", desc: "ABD, Japonya ve müttefiklerin okyanus adalarında ve denizlerdeki çatışmaları." },
        { id: "afrika", name: "Kuzey Afrika & Akdeniz", icon: "fa-sun", desc: "Süveyş Kanalı ve petrol yolları kontrolü için çöl muharebeleri." }
    ],

    events: [
        {
            id: "evt-1939-1",
            year: 1939,
            date: "1 Eylül 1939",
            title: "Almanya'nın Polonya'yı İşgali (Yıldırım Savaşı)",
            frontId: "avrupa",
            category: "Askeri Harekât",
            importance: "Kritik Dönüm Noktası",
            summary: "Alman ordularının 'Blitzkrieg' (Yıldırım Savaşı) taktiğiyle Polonya sınırını geçmesi II. Dünya Savaşı'nı resmen başlattı.",
            description: "1 Eylül 1939 sabahı saat 04.45'te Alman zırhlı tümenleri ve Luftwaffe Polonya'ya saldırdı. İki gün sonra, 3 Eylül'de İngiltere ve Fransa Almanya'ya savaş ilan etti. 17 Eylül'de ise Molotov-Ribbentrop Paktı uyarınca Sovyetler Birliği doğudan Polonya'ya girdi.",
            location: { lat: 52.2297, lng: 21.0122, name: "Varşova, Polonya" },
            casualties: "Polonya: 66.000 şehit, 130.000 yaralı; Almanya: 16.000 ölü",
            image: "assets/images/hero.jpg"
        },
        {
            id: "evt-1940-1",
            year: 1940,
            date: "10 Mayıs - 25 Haziran 1940",
            title: "Fransa Seferi & Dunkerque Tahliyesi",
            frontId: "avrupa",
            category: "Askeri Harekât",
            importance: "Büyük Mihver Zaferi",
            summary: "Almanya, Ardenler Ormanı'nı hızla aşarak Maginot Hattı'nı baypas etti ve Paris'i işgal ederek Fransa'yı teslim aldı.",
            description: "Alman panzer birlikleri 6 hafta gibi kısa bir sürede Fransa'yı saf dışı bıraktı. İngiliz Seferi Kuvvetleri (BEF) ve müttefik askerler Dunkerque kıyılarından sivil teknelerin de katıldığı mucizevi 'Dinamo Harekâtı' ile kurtarıldı. Fransa ikiye bölündü ve Vichy Hükümeti kuruldu.",
            location: { lat: 48.8566, lng: 2.3522, name: "Paris, Fransa" },
            casualties: "Müttefikler: 360.000 ölü/yaralı, 1.9M esir; Almanya: 157.000 zayiat",
            image: "https://images.unsplash.com/photo-1579965342575-16428a7c8881?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "evt-1940-2",
            year: 1940,
            date: "10 Temmuz - 31 Ekim 1940",
            title: "Britanya Savaşı (Hava Muharebesi)",
            frontId: "avrupa",
            category: "Hava Muharebesi",
            importance: "Müttefik Direnişi",
            summary: "Luftwaffe'nin Kraliyet Hava Kuvvetleri'ni (RAF) yok etme girişimi radar teknolojisi ve İngiliz pilotların azmiyle püskürtüldü.",
            description: "Hitler'in İngiltere'yi işgal planı olan 'Denizaslanı Harekâtı'nın ön koşulu hava üstünlüğüydü. RAF'ın Hurricane ve Spitfire uçakları, radar ağının desteğiyle Alman hava saldırılarını durdurdu. Churchill'in ünlü sözü: 'İnsanlık çatışmaları tarihinde hiçbir zaman bu kadar çok insan, bu kadar az kişiye bu kadar çok şey borçlu olmamıştı.'",
            location: { lat: 51.5074, lng: -0.1278, name: "Londra, Birleşik Krallık" },
            casualties: "İngiltere: 1.542 pilot, 40.000 sivil; Almanya: 2.587 havacı",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "evt-1941-1",
            year: 1941,
            date: "22 Haziran 1941",
            title: "Barbarossa Harekâtı (SSCB'nin İşgali)",
            frontId: "dogu",
            category: "Stratejik Taarruz",
            importance: "Savaşın Yön Değiştirmesi",
            summary: "Tarihin en büyük kara istilası: 3 milyondan fazla Mihver askeri Sovyet sınırını aşarak Doğu Cephesi'ni açtı.",
            description: "Hitler'in Lebensraum (Hayat Sahası) vizyonu doğrultusunda 150 tümen ve 3.000 tankla başlatılan harekât, Leningrad, Moskova ve Kiev yönünde ilerledi. Kızıl Ordu ilk aşamada ağır kayıplar verse de 'Kavrulmuş Toprak' taktiği ve erken gelen kış ile Alman ordusu Moskova önlerinde durduruldu.",
            location: { lat: 55.7558, lng: 37.6173, name: "Moskova Önleri, SSCB" },
            casualties: "SSCB: 4.5M asker (kayıp/esir/ölü); Mihver: 830.000 zayiat",
            image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "evt-1941-2",
            year: 1941,
            date: "7 Aralık 1941",
            title: "Pearl Harbor Baskını",
            frontId: "pasifik",
            category: "Deniz / Hava Baskını",
            importance: "ABD'nin Savaşa Girişi",
            summary: "Japon İmparatorluk Donanması'nın Hawaii'deki ABD Pasifik Filosuna habersiz düzenlediği yıkıcı hava saldırısı.",
            description: "Amiral Yamamoto komutasındaki 6 uçak gemisinden kalkan Japon filoları, Amerikan donanmasını felç etmeyi hedefledi. 4 zırhlı batırıldı, yüzlerce uçak tahrip edildi. Ertesi gün Başkan Roosevelt 'Utançla Hatırlanacak Gün' konuşmasını yaparak Japonya'ya savaş ilan etti.",
            location: { lat: 21.3649, lng: -157.9492, name: "Pearl Harbor, Hawaii" },
            casualties: "ABD: 2.403 asker ve sivil ölü, 1.178 yaralı; Japonya: 64 kayıp",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "evt-1942-1",
            year: 1942,
            date: "4 - 7 Haziran 1942",
            title: "Midway Deniz Muharebesi",
            frontId: "pasifik",
            category: "Deniz Muharebesi",
            importance: "Pasifik Dönüm Noktası",
            summary: "ABD Donanması'nın Japon şifrelerini çözerek 4 ağır Japon uçak gemisini batırdığı efsanevi deniz savaşı.",
            description: "Kriptologların 'JN-25' şifresini kırmasıyla ABD Donanması Japon tuzağını önceden haber aldı. Uçak gemilerinden kalkan torpido ve pike bombardıman uçakları, Akagi, Kaga, Soryu ve Hiryu gemilerini batırarak Pasifik'teki inisiyatifi kalıcı olarak müttefiklere geçirdi.",
            location: { lat: 28.2072, lng: -177.3735, name: "Midway Atolü, Pasifik" },
            casualties: "Japonya: 4 uçak gemisi, 3.057 ölü; ABD: 1 uçak gemisi (USS Yorktown), 307 ölü",
            image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "evt-1942-2",
            year: 1942,
            date: "23 Ekim - 11 Kasım 1942",
            title: "İkinci El Alameyn Muharebesi",
            frontId: "afrika",
            category: "Çöl Muharebesi",
            importance: "Afrika'nın Kurtuluşu",
            summary: "General Montgomery komutasındaki İngiliz 8. Ordusu, Erwin Rommel'in 'Afrika Kolordusu'nu (Afrika Korps) kesin mağlubiyete uğrattı.",
            description: "Süveyş Kanalı ve Orta Doğu petrol sahalarına ulaşmak isteyen Mihver güçlerinin rüyası El Alameyn çöllerinde sona erdi. Churchill bu zafer için: 'Bu son değil. Hatta sonun başlangıcı bile değil. Ancak belki de başlangıcın sonudur.' demiştir.",
            location: { lat: 30.8333, lng: 28.9500, name: "El Alameyn, Mısır" },
            casualties: "Müttefikler: 13.560 ölü/yaralı; Mihver: 30.000 zayiat ve esir",
            image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "evt-1942-3",
            year: 1942,
            date: "23 Ağustos 1942 - 2 Şubat 1943",
            title: "Stalingrad Muharebesi",
            frontId: "dogu",
            category: "Şehir Savaşı",
            importance: "II. Dünya Savaşı'nın Ana Kırılma Noktası",
            summary: "Tarihin en şiddetli sokak sokak muharebesi; Mareşal Paulus'un 6. Ordusunun kuşatılarak teslim olmasıyla Hitler ilk büyük çöküşünü yaşadı.",
            description: "Volga nehri kıyısındaki şehirde her ev bir kaleye dönüştü. Sovyetlerin 'Uranüs Harekâtı' ile 300.000 kişilik Alman ordusu çembere alındı. Dondurucu soğuk, açlık ve mühimmatsızlık sonucu Alman 6. Ordusu teslim oldu. Bu zafer Kızıl Ordu'nun Berlin'e kadar sürecek kesintisiz taarruzunun başlangıcı oldu.",
            location: { lat: 48.7080, lng: 44.5133, name: "Volgograd (Stalingrad), Rusya" },
            casualties: "Toplam Zayiat: Yaklaşık 2 Milyon insan (asker ve sivil)",
            image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "evt-1943-1",
            year: 1943,
            date: "5 - 16 Temmuz 1943",
            title: "Kursk Tank Muharebesi",
            frontId: "dogu",
            category: "Zırhlı Birlikler Savaşı",
            importance: "Tarihin En Büyük Tank Savaşı",
            summary: "6.000'den fazla tankın karşı karşıya geldiği 'Hisar Harekâtı' (Operation Citadel), Alman zırhlı gücünün belini kırdı.",
            description: "Prokhorovka tarlalarında Tiger ve Panther tankları T-34'lerle göğüs göğüse çarpıştı. Derinlemesine savunma hatları kuran Sovyetler, Alman taarruzunu eritti ve Doğu Cephesi'nde stratejik inisiyatifi bir daha geri vermemek üzere ele geçirdi.",
            location: { lat: 51.7303, lng: 36.1926, name: "Kursk, Rusya" },
            casualties: "Almanya: 50.000 ölü, 300 tank; SSCB: 177.000 zayiat, 1.600 tank",
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "evt-1944-1",
            year: 1944,
            date: "6 Haziran 1944",
            title: "Normandiya Çıkarması (D-Day / Overlord Harekâtı)",
            frontId: "avrupa",
            category: "Amfibi Çıkarma",
            importance: "Batı Cephesi'nin Açılması",
            summary: "Tarihin en büyük amfibi harekâtı: 156.000 Müttefik askeri Manş Denizi'ni aşarak Fransa kıyılarına çıkarma yaptı.",
            description: "General Dwight Eisenhower başkomutanlığında Utah, Omaha, Gold, Juno ve Sword sahillerine çıkarma yapıldı. Özellikle Omaha sahilindeki 'Kanlı Omaha' direnişine rağmen Müttefikler kıyıda köprübaşı kurmayı başardı ve Paris'in kurtuluşunun yolunu açtı.",
            location: { lat: 49.3697, lng: -0.8711, name: "Normandiya Kıyıları, Fransa" },
            casualties: "D-Day Günü Müttefik Zayiatı: 10.000+ (4.414 teyitli ölü); Alman Kaybı: 4.000-9.000",
            image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "evt-1945-1",
            year: 1945,
            date: "16 Nisan - 2 Mayıs 1945",
            title: "Berlin Muharebesi & Reichstag'ın Düşüşü",
            frontId: "avrupa",
            category: "Nihai Taarruz",
            importance: "Üçüncü Reich'ın Çöküşü",
            summary: "Kızıl Ordu'nun Berlin'i kuşatması, Hitler'in intiharı ve Sovyet bayrağının Reichstag binasına çekilmesi.",
            description: "Mareşal Jukov komutasındaki birlikler şehri yoğun topçu ateşiyle döverek sokak sokak ilerledi. 30 Nisan 1945'te Adolf Hitler sığınağında intihar etti. 8 Mayıs 1945'te Almanya kayıtsız şartsız teslim oldu (Zafer Günü - VE Day).",
            location: { lat: 52.5186, lng: 13.3763, name: "Berlin, Almanya" },
            casualties: "SSCB: 81.000 ölü; Almanya: 100.000 asker, 125.000 sivil ölü",
            image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "evt-1945-2",
            year: 1945,
            date: "6 ve 9 Ağustos 1945",
            title: "Hiroşima ve Nagazaki Atom Bombaları",
            frontId: "pasifik",
            category: "Nükleer Silah Kullanımı",
            importance: "Savaşın Sonu ve Nükleer Çağın Başlangıcı",
            summary: "ABD'nin B-29 bombardıman uçaklarıyla 'Little Boy' ve 'Fat Man' atom bombalarını atması sonucu Japonya teslim oldu.",
            description: "Manhattan Projesi ürünü nükleer bombalar iki Japon kentini anında kül etti. Yüz binlerce sivil saniyeler içinde ve sonrasındaki radyasyon etkisiyle can verdi. 2 Eylül 1945'te USS Missouri zırhlısında Japonya'nın resmi teslim belgesini imzalamasıyla II. Dünya Savaşı resmen sona erdi.",
            location: { lat: 34.3853, lng: 132.4553, name: "Hiroşima, Japonya" },
            casualties: "İlk anda ve radyasyonla: 140.000+ (Hiroşima), 74.000+ (Nagazaki)",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
        }
    ],

    battles: [
        {
            id: "stalingrad",
            name: "Stalingrad Muharebesi",
            front: "Doğu Cephesi",
            date: "1942 - 1943",
            belligerents: {
                allies: ["Sovyetler Birliği (Kızıl Ordu)"],
                axis: ["Nazi Almanyası", "Romanya", "İtalya", "Macaristan"]
            },
            commanders: {
                allies: "Georgi Jukov, Vasili Çuykov",
                axis: "Friedrich Paulus, Hermann Hoth"
            },
            outcome: "Sovyet Zaferi (Dönüm Noktası)",
            casualties: "Toplam ~2.000.000 kayıp",
            badgeClass: "badge-allies",
            desc: "II. Dünya Savaşı'nın en kanlı çatışması olup, Alman ordusunun doğuda stratejik inisiyatifi tamamen yitirmesine neden olmuştur."
        },
        {
            id: "normandiya",
            name: "Normandiya Çıkarması (D-Day)",
            front: "Batı / Avrupa Cephesi",
            date: "6 Haziran 1944",
            belligerents: {
                allies: ["ABD", "Birleşik Krallık", "Kanada", "Özgür Fransa"],
                axis: ["Nazi Almanyası"]
            },
            commanders: {
                allies: "Dwight D. Eisenhower, Bernard Montgomery",
                axis: "Gerd von Rundstedt, Erwin Rommel"
            },
            outcome: "Müttefik Zaferi (Batı Cephesi Açıldı)",
            casualties: "Müttefik: 10.000+ ilk gün / Mihver: 4.000 - 9.000",
            badgeClass: "badge-allies",
            desc: "Tarihin en büyük denizden karaya amfibi harekâtı olup Batı Avrupa'nın Nazi işgalinden kurtarılmasını başlatmıştır."
        },
        {
            id: "midway",
            name: "Midway Deniz Muharebesi",
            front: "Pasifik Cephesi",
            date: "4 - 7 Haziran 1942",
            belligerents: {
                allies: ["Amerika Birleşik Devletleri"],
                axis: ["Japon İmparatorluğu"]
            },
            commanders: {
                allies: "Chester W. Nimitz, Raymond Spruance",
                axis: "Isoroku Yamamoto, Chuichi Nagumo"
            },
            outcome: "ABD / Müttefik Zaferi",
            casualties: "Japonya 4 uçak gemisi kaybetti",
            badgeClass: "badge-allies",
            desc: "Japon donanmasının ana hücum gücünü kıran ve Pasifik'te müttefiklerin karşı taarruza geçmesini sağlayan dönüm noktası."
        },
        {
            id: "kursk",
            name: "Kursk Muharebesi",
            front: "Doğu Cephesi",
            date: "Temmuz - Ağustos 1943",
            belligerents: {
                allies: ["Sovyetler Birliği"],
                axis: ["Nazi Almanyası"]
            },
            commanders: {
                allies: "Konstantin Rokossovski, Georgi Jukov",
                axis: "Erich von Manstein, Walter Model"
            },
            outcome: "Kesin Sovyet Zaferi",
            casualties: "Zırhlı araç kayıpları: 2.000+",
            badgeClass: "badge-allies",
            desc: "Tarihin en büyük tank savaşı olarak bilinir. Alman zırhlı taarruz kabiliyeti bu muharebede telafi edilemez darbe almıştır."
        },
        {
            id: "el-alameyn",
            name: "İkinci El Alameyn Muharebesi",
            front: "Kuzey Afrika Cephesi",
            date: "Ekim - Kasım 1942",
            belligerents: {
                allies: ["Birleşik Krallık", "Avustralya", "Yeni Zelanda", "Güney Afrika", "Hindistan"],
                axis: ["Nazi Almanyası", "İtalya Krallığı"]
            },
            commanders: {
                allies: "Bernard Montgomery",
                axis: "Erwin Rommel (Çöl Tilkisi)"
            },
            outcome: "Müttefik Zaferi",
            casualties: "Mihver: 30.000 zayiat ve esir",
            badgeClass: "badge-allies",
            desc: "Süveyş Kanalı ve Mısır'a yönelik Mihver tehdidini tamamen ortadan kaldıran ve Afrika'daki geri çekilmeyi başlatan savaş."
        },
        {
            id: "pearl-harbor",
            name: "Pearl Harbor Baskını",
            front: "Pasifik Cephesi",
            date: "7 Aralık 1941",
            belligerents: {
                allies: ["Amerika Birleşik Devletleri"],
                axis: ["Japon İmparatorluğu"]
            },
            commanders: {
                allies: "Husband E. Kimmel, Walter Short",
                axis: "Isoroku Yamamoto, Chuichi Nagumo"
            },
            outcome: "Taktik Japon Zaferi / ABD Savaşa Girdi",
            casualties: "ABD: 2.403 ölü, 4 zırhlı gemi battı",
            badgeClass: "badge-axis",
            desc: "Japonya'nın ABD donanmasını saf dışı bırakmak amacıyla düzenlediği sürpriz hava baskını, ABD'nin resmi olarak savaşa girmesini tetikledi."
        }
    ],

    people: [
        {
            id: "churchill",
            name: "Winston Churchill",
            role: "Birleşik Krallık Başbakanı",
            category: "allies",
            dates: "1874 - 1965",
            country: "Birleşik Krallık",
            image: "https://images.unsplash.com/photo-1580130775552-6a7516d26786?auto=format&fit=crop&w=400&q=80",
            bio: "İngiliz halkına ve müttefiklere savaşı kazanma inancını aşılayan, hitabet gücü ve tavizsiz tutumuyla bilinen efsanevi başbakan.",
            quote: "Biz sahillerde savaşacağız, iniş pistlerinde savaşacağız, tarlalarda ve sokaklarda savaşacağız, tepelerde savaşacağız; asla teslim olmayacağız!"
        },
        {
            id: "roosevelt",
            name: "Franklin D. Roosevelt",
            role: "ABD Başkanı",
            category: "allies",
            dates: "1882 - 1945",
            country: "Amerika Birleşik Devletleri",
            image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80",
            bio: "ABD'yi Büyük Buhran'dan çıkaran ve 'Demokrasinin Cephaneliği' yaparak müttefik zaferinin mimarlarından biri olan 32. ABD Başkanı.",
            quote: "Korkmamız gereken tek şey, korkunun kendisidir."
        },
        {
            id: "stalin",
            name: "Joseph Stalin",
            role: "Sovyetler Birliği Genel Sekreteri",
            category: "allies",
            dates: "1878 - 1953",
            country: "Sovyetler Birliği (SSCB)",
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80",
            bio: "Büyük Vatanseverlik Savaşı'nda SSCB'yi yöneten, devasa insan ve sanayi gücünü seferber ederek Berlin'i ele geçiren Sovyet lideri.",
            quote: "Bir kişinin ölümü trajedi, milyonların ölümü ise bir istatistiktir."
        },
        {
            id: "eisenhower",
            name: "Dwight D. Eisenhower",
            role: "Müttefik Seferi Kuvvetleri Başkomutanı",
            category: "commander",
            dates: "1890 - 1969",
            country: "ABD",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80",
            bio: "Normandiya Çıkarması (Overlord Harekâtı) ve Batı Cephesi'ndeki tüm müttefik ordularını sevk ve idare eden 5 yıldızlı general.",
            quote: "Savaş hazırlıklarında planlar hiçbir şeydir, fakat planlama her şeydir."
        },
        {
            id: "jukov",
            name: "Georgi Jukov",
            role: "Sovyetler Birliği Mareşali",
            category: "commander",
            dates: "1896 - 1974",
            country: "SSCB",
            image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80",
            bio: "Moskova Savunması, Stalingrad, Kursk ve Berlin Muharebesi'nin mimarı olan, Kızıl Ordu'nun en başarılı stratejisti.",
            quote: "Eğer bir mayın tarlasına rastlarsak piyadelerimiz sanki orada mayın yokmuş gibi saldırıya devam eder."
        },
        {
            id: "hitler",
            name: "Adolf Hitler",
            role: "Nazi Almanyası Führer'i",
            category: "axis",
            dates: "1889 - 1945",
            country: "Almanya (Üçüncü Reich)",
            image: "https://images.unsplash.com/photo-1579965342575-16428a7c8881?auto=format&fit=crop&w=400&q=80",
            bio: "Totaliter Nazi rejimini kuran, yayılmacı politikasıyla savaşı başlatan ve Holokost ile milyonlarca insanın katledilmesinden sorumlu diktatör.",
            quote: "Büyük yalanlar kurgulayın; insanlar küçük yalanlardan ziyade büyüklerine inanmaya daha yatkındır."
        },
        {
            id: "rommel",
            name: "Erwin Rommel",
            role: "Alman Mareşal ('Çöl Tilkisi')",
            category: "commander",
            dates: "1891 - 1944",
            country: "Almanya",
            image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80",
            bio: "Kuzey Afrika'da gösterdiği taktik ustalık nedeniyle hem müttefiklerin hem Mihver'in saygısını kazanmış zırhlı birlikler ustası.",
            quote: "Cesaretinizi kaybetmeyin. Bazen şans en umulmadık anda döner."
        },
        {
            id: "oppenheimer",
            name: "J. Robert Oppenheimer",
            role: "Manhattan Projesi Bilimsel Direktörü",
            category: "civilian",
            dates: "1904 - 1967",
            country: "ABD",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
            bio: "Atom bombasının geliştirildiği Manhattan Projesi'ne liderlik eden ve 'Atom Bombasının Babası' olarak anılan teorik fizikçi.",
            quote: "Şimdi ben ölüm oldum; dünyaların yok edicisi."
        }
    ],

    countries: {
        allies: [
            { name: "Amerika Birleşik Devletleri", flag: "🇺🇸", mobilized: "16.1 Milyon", deaths: "418.000", role: "Sanayi gücü, Pasifik ve Batı Cephesi baş aktörü" },
            { name: "Sovyetler Birliği (SSCB)", flag: "🚩", mobilized: "34.4 Milyon", deaths: "27.000.000", role: "Doğu Cephesi'nde Alman ordusunun %80'ini imha eden ana güç" },
            { name: "Birleşik Krallık & İmparatorluk", flag: "🇬🇧", mobilized: "5.8 Milyon", deaths: "450.000", role: "1940'ta tek başına direnen, deniz ve hava hâkimi müttefik" },
            { name: "Çin Cumhuriyeti", flag: "🇨🇳", mobilized: "14.0 Milyon", deaths: "15.000.000 - 20.000.000", role: "Asya'da Japon ordusunu yıllarca oyalayan büyük cephe" },
            { name: "Özgür Fransa", flag: "🇫🇷", mobilized: "1.2 Milyon", deaths: "567.000", role: "General De Gaulle önderliğinde direniş ve kıta harekâtı" }
        ],
        axis: [
            { name: "Nazi Almanyası", flag: "🇩🇪", mobilized: "18.2 Milyon", deaths: "7.000.000 - 9.000.000", role: "Mihver blokunun lideri, Blitzkrieg ve Holokost'un faili" },
            { name: "Japon İmparatorluğu", flag: "🇯🇵", mobilized: "8.4 Milyon", deaths: "2.600.000 - 3.100.000", role: "Pasifik ve Doğu Asya'yı işgal eden yayılmacı güç" },
            { name: "İtalya Krallığı (1940-1943)", flag: "🇮🇹", mobilized: "3.4 Milyon", deaths: "457.000", role: "Akdeniz ve Afrika'da Mussolini yönetiminde Mihver ortağı" }
        ]
    },

    topics: [
        {
            id: "holokost",
            title: "Holokost ve Soykırım",
            icon: "fa-fire",
            shortDesc: "Nazi rejiminin 6 milyon Yahudi ile birlikte Romanları, engellileri ve siyasi muhalifleri sistematik olarak katletmesi.",
            detail: "Auschwitz-Birkenau, Treblinka ve Sobibor gibi ölüm kamplarında endüstriyel yöntemlerle milyonlarca masum katledildi. 'Nihai Çözüm' (Endlösung) planı tarihin gördüğü en organize insanlık suçudur."
        },
        {
            id: "teknoloji",
            title: "Teknoloji, Kod Kırma ve Silahlar",
            icon: "fa-microchip",
            shortDesc: "Radar, jet uçakları (Me 262), V-2 roketleri, Enigma şifre çözümü ve atom bombası gibi teknolojik devrimler.",
            detail: "Alan Turing ve Bletchley Park ekibinin Enigma şifrelerini kırması müttefiklere kritik istihbarat (Ultra) sağladı. Manhattan Projesi ile nükleer çağ başladı."
        },
        {
            id: "siyaset",
            title: "Siyasi Zirveler & Yeni Dünya Düzeni",
            icon: "fa-landmark",
            shortDesc: "Tahran, Yalta ve Potsdam Konferansları ile savaş sonrası dünyanın paylaşılması.",
            detail: "Churchill, Roosevelt ve Stalin'in katıldığı zirvelerde Birleşmiş Milletler'in temelleri atıldı, Almanya'nın bölünmesi kararlaştırıldı ve Soğuk Savaş'ın tohumları serpildi."
        },
        {
            id: "gunluk-hayat",
            title: "Cephe Gerisi ve Kadınların Rolü",
            icon: "fa-person-dress",
            shortDesc: "Karartma geceleri, karne sistemi, fabrikalarda çalışan kadınlar ve propaganda savaşı.",
            detail: "Erkeklerin cephede olduğu dönemde fabrikalarda tank, uçak ve mühimmat üreten kadınlar ('Rosie the Riveter') zaferin arka plandaki gizli kahramanları oldu."
        }
    ],

    media: {
        photos: [
            { title: "Reichstag Üzerine Çekilen Kızıl Bayrak (1945)", category: "Avrupa Cephesi", url: "assets/images/hero.jpg", desc: "Berlin Muharebesi'nin sembol anı." },
            { title: "Normandiya Kıyılarına İnen Askerler (D-Day)", category: "Batı Cephesi", url: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=800&q=80", desc: "General Eisenhower'ın tarihi çıkarma operasyonu." },
            { title: "Pearl Harbor Baskını Sırasında Yanan Zırhlılar", category: "Pasifik Cephesi", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", desc: "USS Arizona ve çevresindeki patlamalar." },
            { title: "Stalingrad Sokak Çatışmaları (1942)", category: "Doğu Cephesi", url: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80", desc: "Harabeye dönmüş binalar arasında keskin nişancı mücadeleleri." }
        ],
        speeches: [
            { title: "Winston Churchill: 'We Shall Fight on the Beaches'", date: "4 Haziran 1940", speaker: "Winston Churchill", duration: "1:42", note: "Avam Kamarası'nda yapılan tarihi direniş konuşması." },
            { title: "Franklin D. Roosevelt: 'A Date Which Will Live in Infamy'", date: "8 Aralık 1941", speaker: "F. D. Roosevelt", duration: "2:10", note: "Pearl Harbor sonrası Kongre'de yapılan savaş ilanı hitabı." },
            { title: "General Charles de Gaulle: '18 Haziran Çağrısı'", date: "18 Haziran 1940", speaker: "Charles de Gaulle", duration: "1:15", note: "BBC radyosundan Fransız halkına direniş çağrısı." }
        ],
        documents: [
            { title: "Molotov-Ribbentrop Paktı (1939)", desc: "Almanya ve SSCB arasındaki gizli protokolleri içeren saldırmazlık anlaşması.", type: "PDF Arşivi / Metin" },
            { title: "Almanya'nın Kayıtsız Şartsız Teslim Belgesi (1945)", desc: "Reims ve Berlin'de imzalanan ve savaşı bitiren resmî protokol.", type: "Tarihi Belge" },
            { title: "Japonya'nın Teslim Belgesi (USS Missouri)", desc: "2 Eylül 1945 tarihinde Tokyo Körfezi'nde imzalanan nihai teslim senedi.", type: "Diplomatik Belge" }
        ]
    },

    initialComments: [
        { id: 1, author: "Prof. Dr. Ahmet Yılmaz", date: "2 saat önce", entity: "Stalingrad Muharebesi", content: "Kızıl Ordu'nun Uranüs Harekâtı ile 6. Orduyu kuşatması askeri tarih açısından çift taraflı çevirme taktiğinin zirve noktasıdır.", status: "approved" },
        { id: 2, author: "Can Berk", date: "Dün", entity: "Normandiya Çıkarması", content: "Kandil Harekâtı ve aldatma taktikleri (Operation Fortitude) olmasaydı D-Day bu kadar başarılı olamazdı. Harika bir arşiv çalışması.", status: "approved" },
        { id: 3, author: "Zeynep Kaya", date: "3 gün önce", entity: "Alan Turing & Enigma", content: "Bletchley Park kod kırıcılarının katkısı savaşı en az iki yıl kısaltmış ve milyonlarca hayat kurtarmıştır.", status: "approved" }
    ]
};
