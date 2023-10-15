
const monthToString = (data) => {
    const date = new Date(data)
    const month = date.getMonth()
    switch (month) {
        case 0: return 'янв'
        case 1: return 'фев'
        case 2: return 'мар'
        case 3: return 'апр'
        case 4: return 'май'
        case 5: return 'июн'
        case 6: return 'июл'
        case 7: return 'авг'
        case 8: return 'сен'
        case 9: return 'ноя'
        case 10: return 'окт'
        case 11: return 'дек'
    }
}

const monthToStringEng = (data) => {
    const date = new Date(data)
    const month = date.getMonth()
    switch (month) {
        case 0: return 'Jan'
        case 1: return 'Feb'
        case 2: return 'Mar'
        case 3: return 'Apr'
        case 4: return 'May'
        case 5: return 'Jun'
        case 6: return 'Jul'
        case 7: return 'Aug'
        case 8: return 'Sep'
        case 9: return 'Nov'
        case 10: return 'Oct'
        case 11: return 'Dec'
    }
}

const weekToStringEng = (data) => {
    const date = new Date(data)
    const month = date.getMonth()
    switch (month) {
        case 0: return 'Sun'
        case 1: return 'Mon'
        case 2: return 'Tue'
        case 3: return 'Wed'
        case 4: return 'Thu'
        case 5: return 'Fri'
        case 6: return 'Sat'
    }
}

export default timeFormatter = {
    monthToString,
    monthToStringEng,
    weekToStringEng
}