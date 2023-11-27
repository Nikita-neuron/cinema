import {
    GET_SEATS_BY_HALL,
    UPDATE_SEAT_BY_HALL,
    UPDATE_SEATS_SIZE,
    UPDATE_SEATS_PRICE,
    SAVE_SEATS_BY_HALL,
    
} from "../types"

const initialState = {
    seats: [[{
        row: 1,
        column: 1,
        type: "Обычное",
        price: 1,
        hall_id: 1
    }]],
    rowNumber: 1,
    columnNumber: 1,
    regularPrice: 1,
    vipPrice: 1,
    hall_id: 1
}

export const seats = (state = initialState, action) => {
    switch (action.type) {
        case GET_SEATS_BY_HALL:
            const data = action.payload.data;

            let maxRow = 0;
            let maxColumn = 0;

            data.forEach(seat => {
                maxRow = Math.max(maxRow, seat.row);
                maxColumn = Math.max(maxColumn, seat.column);
            });

            let matrix = [];
            for (let i = 0; i < maxRow; i++) {
                matrix[i] = [];
                for (let j = 0; j < maxColumn; j++) {
                    matrix[i][j] = {
                        row: i,
                        column: j,
                        type: "Обычное",
                        price: 1,
                        hall_id: action.payload.hall_id
                    }
                }
            }

            let regularPrice = 1;
            let vipPrice = 1;

            data.forEach(seat => {
                if (seat.type == "Обычное") regularPrice = seat.price;
                if (seat.type == "VIP") vipPrice = seat.price;
                matrix[seat.row - 1][seat.column - 1] = seat;
            });
            return {
                ...state,
                seats: matrix,
                rowNumber: maxRow,
                columnNumber: maxColumn,
                regularPrice: regularPrice,
                vipPrice: vipPrice,
                hall_id: action.payload.hall_id
            }

        case UPDATE_SEAT_BY_HALL:
            return (() => {
                const newSeat = action.payload;
                const { seats } = state;

                const arr = [
                    ...seats[newSeat.row - 1].slice(0, newSeat.column - 1),
                    newSeat,
                    ...seats[newSeat.row - 1].slice(newSeat.column)
                ];

                const newSeats = [
                    ...seats.slice(0, newSeat.row - 1),
                    arr,
                    ...seats.slice(newSeat.row)
                ]
    
                return {
                    ...state,
                    seats: newSeats
                }
            })()

        case UPDATE_SEATS_SIZE:
            return (() => {
                const { rowNumber, columnNumber } = action.payload;
                const { seats } = state;

                let newSeats = [[]];
                for (let i = 0; i < seats.length; i++) {
                    newSeats[i] = [...seats[i].slice(0, columnNumber)];
                    if (newSeats[i].length < columnNumber) {
                        for (let j = newSeats[i].length; j < columnNumber; j++) {
                            newSeats[i][j] = {
                                row: i + 1,
                                column: j + 1,
                                type: "Обычное",
                                price: state.regularPrice,
                                hall_id: state.hall_id
                            }
                        }
                    }
                }
                
                newSeats = newSeats.slice(0, rowNumber);
                if (newSeats.length < rowNumber) {
                    for (let i = newSeats.length; i < rowNumber; i++) {
                        newSeats[i] = [];
                        for (let j = 0; j < columnNumber; j++) {
                            newSeats[i][j] = {
                                row: i + 1,
                                column: j + 1,
                                type: "Обычное",
                                price: state.regularPrice,
                                hall_id: state.hall_id
                            }
                        }
                    }
                }

                return {
                    ...state,
                    seats: newSeats,
                    rowNumber: rowNumber,
                    columnNumber: columnNumber
                }
            })()

        case UPDATE_SEATS_PRICE:
            return (() => {
                const { regularPrice, vipPrice } = action.payload;
                const { seats } = state;

                let newSeats = [];

                for (let i = 0; i < seats.length; i++) {
                    newSeats[i] = [];
                    for (let j = 0; j< seats[i].length; j++) {
                        if (seats[i][j].type == "Обычное") {
                            newSeats[i][j] = {
                                ...seats[i][j],
                                price: regularPrice
                            }
                        }
                        else if (seats[i][j].type == "VIP") {
                            newSeats[i][j] = {
                                ...seats[i][j],
                                price:vipPrice
                            }
                        }
                        else {
                            newSeats[i][j] = { ...seats[i][j] } 
                        }
                    }
                }

                return {
                    ...state,
                    seats: newSeats,
                    regularPrice: regularPrice,
                    vipPrice: vipPrice
                }
            })()

        case SAVE_SEATS_BY_HALL:
            return (() => {
                return state;
            })();
        default: return state;
    }
}