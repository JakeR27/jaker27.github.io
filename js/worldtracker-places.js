const PLACES = [
    {
        type: Categories.HOME,
        latitude: 53.81030, longitude: -1.57441,
        title: "3 Beamsley Terrace, LS61LP",
        description: "Jake's 3rd & 4th year university house",
        visits: [
            {date: "30/06/2024", info: "Move out"},
            {date: "01/07/2022", info: "Move in"},
        ],
    },
    {
        type: Categories.HOME,
        latitude: 54.99161,
        longitude: -1.6108,
        title: "33 Forsyth Road, NE23DB",
        description: "Abby's 3rd year university house",
        visits: [
            {date: "30/06/2024", info: "Move out (ish)"},
            {date: "01/07/2023", info: "Move in (ish)"},
        ],
    },
    {
        type: Categories.ACTIVITY,
        latitude: 51.33435,
        longitude: 0.50568,
        title: "Buckmore Kart Circuit, ME59QG",
        description: "Karting Track",
        visits: [
            {date: "15/02/2024", info: "BUKC Round 2 Inters - Watching"},
            {date: "14/02/2024", info: "BUKC Round 2 Mains - Racing"},
        ],
        icon: kartingIcon
    },
    {
        type: Categories.STAYOVER,
        latitude: 51.37627,
        longitude: 0.47478,
        title: "Travelodge Medway M2, ME88PQ",
        description: "Travelodge",
        visits: [
            {date: "14/02/2024", info: "Night before BUKC Round 2 Inters - Watching"},
            {date: "13/02/2024", info: "Night before BUKC Round 2 Mains - Racing"},
        ],
        icon: cheapHotelIcon
    },
    {
        type: Categories.TRANSPORT,
        latitude: 54.77975, longitude: -1.58151,
        title: "Durham Train Station",
        description: "National Rail Station",
        visits: [
            {date: "16/11/2023", info: "Lumiere Light Festival"},
        ],
        icon: trainIcon
    },
    {
        type: Categories.STAYOVER,
        latitude: 53.18573, longitude: -2.67224,
        info: "<b>Three Keys Cottage</b><br>Jake's family house - cat sitting",
        icon: fancyHotelIcon
    },
    {
        type: Categories.TRANSPORT,
        latitude: 53.95770, longitude: -1.09374,
        info: "<b>York Train Station</b><br>2023",
        icon: trainIcon
    },
    {
        type: Categories.ACTIVITY,
        latitude: 54.99050, longitude: -1.68396,
        info: "<b>Tyneside Badminton Centre</b><br>2023, 2024",
        icon: badmintonIcon
    },
    {
        type: Categories.VISIT,
        latitude: 55.41023, longitude: -1.69939,
        info: "<b>Barter Books</b><br>2024",
        icon: monumentIcon
    },
    {
        type: Categories.VISIT,
        latitude: 55.60937, longitude: -1.71125,
        info: "<b>Bamburgh Castle</b><br>2024",
        icon: monumentIcon
    },
    {
        type: Categories.VISIT,
        latitude: 55.60684, longitude: -1.71635,
        info: "<b>Bamburgh Pub</b><br> Don't remember exactly where. 2024",
        icon: monumentIcon
    },
    {
        type: Categories.VISIT,
        latitude: 53.79797, longitude: -1.54437,
        info: "<b>The Lost and Found - Leeds Club</b><br> Valentines 2024",
        icon: unknownIcon//foodIcon
    },
    {
        type: Categories.VISIT,
        latitude: 53.79876, longitude: -1.54684,
        info: "<b>The Decanter</b><br> Valentines 2024",
        icon: unknownIcon//drinksIcon
    },
    {
        type: Categories.VISIT,
        latitude: 53.96082, longitude: -1.08183,
        info: "<b>Lucia</b><br> 2023",
        icon: unknownIcon//foodIcon
    },
    {
        type: Categories.VISIT,
        latitude: 53.89346, longitude: -1.69048,
        info: "<b>Surprise View</b><br> 2023",
        icon: monumentIcon//viewIcon
    },
    {
        type: Categories.TRANSPORT_LOCAL,
        latitude: 53.79474, longitude: -1.54778,
        info: "<b>Leeds Train Station</b><br>Valentines 2024",
        icon: trainIcon
    },
    {
        type: Categories.TRANSPORT_LOCAL,
        latitude: 53.81214, longitude: -1.57792,
        info: "<b>Burley Park Station</b><br>Valentines 2024",
        icon: trainIcon
    },
    {
        type: Categories.VISIT,
        latitude: 53.10424, longitude: -2.71349,
        info: "<b>The Pheasant Inn</b><br> 2023",
        icon: monumentIcon//foodIcon
    },
    {
        type: Categories.VISIT,
        latitude: 54.91411, longitude: -1.58950,
        info: "<b>Angel of the North</b><br> 2023",
        icon: monumentIcon
    },
    {
        type: Categories.TRANSPORT_LOCAL,
        latitude: 55.01693, longitude: -1.42882,
        locality: 0, //Localities.LOCAL
        info: "<b>Tynemouth Metro Station</b><br> 2024",
        icon: trainIcon//metroIcon
    },
    {
        type: Categories.TRANSPORT_LOCAL,
        latitude: 54.99343, longitude: -1.60979,
        locality: 0, //Localities.LOCAL
        info: "<b>Jesmond Metro Station</b><br> 2024",
        icon: trainIcon//metroIcon
    },
    {
        type: Categories.VISIT,
        latitude: 53.82096, longitude: -1.60644,
        locality: 0, //Localities.LOCAL
        info: "<b>Kirkstall Abbey</b><br> 2024",
        icon: monumentIcon//churchIcon
    },

]

