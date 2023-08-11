import { CountryProps, MunicipalityProps, ProvinceProps } from '@/app/utils'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface LocationState {
	countries: CountryProps[]
	provinces: ProvinceProps[]
	municipalities: MunicipalityProps[]
}

const initialState: LocationState = {
	countries: [],
	provinces: [],
	municipalities: []
}

export const locationSlice = createSlice({
	name: 'locations',
	initialState,
	reducers: {
		loadLocationStore: (state, action: PayloadAction<LocationState>) => {
			state.countries = action.payload.countries
			state.provinces = action.payload.provinces
			state.municipalities = action.payload.municipalities
		}
	}
})

export const { loadLocationStore } = locationSlice.actions
export const locationReducer = locationSlice.reducer
