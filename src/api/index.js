import axios from "axios";

// const API_URL = "/api";
const API_URL = "http://127.0.0.1:5000/api"

export function login(userData) {
	return axios.post(`${API_URL}/login`, userData)
}

export function fetchRoute(id) {
	return axios.get(`${API_URL}/route/${id.toString()}`);
}

export function fetchRoutes(page_no) {
	return axios.get(`${API_URL}/route/paged/${page_no.toString()}`);
}

export function fetchParameter(id) {
	return axios.get(`${API_URL}/route/${id.toString()}`);
}

export function fetchParameters(page_no) {
	return axios.get(`${API_URL}/parameter/paged/${page_no.toString()}`);
}

export function fetchVehicle(id) {
	return axios.get(`${API_URL}/vehicle/${id.toString()}`);
}

export function fetchVehicles(page_no) {
	return axios.get(`${API_URL}/vehicle/paged/${page_no.toString()}`);
}

export function fetchVehiclesSearch(json, page_no) {
	return axios.post(`${API_URL}/vehicle/search/${page_no.toString()}`, json, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export function fetchIdDatalist(json) {
	return axios.post(`${API_URL}/auto-complete/id`, json, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export function fetchRouteDatalist(json) {
	return axios.post(`${API_URL}/auto-complete/name`, json, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export function fetchRoutesSearch(json, page_no) {
	return axios.post(`${API_URL}/route/search/${page_no}`, json, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export function fetchParametersSearch(json, page_no) {
	return axios.post(`${API_URL}/parameter/search/${page_no}`, json, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export function updateParameter(id, json) {
	return axios.put(`${API_URL}/parameter/${id}`, json, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export function updateRouteFiles(id, formData) {
	return axios.put(`${API_URL}/route/${id}`, formData);
}

export function fetchDistance(id) {
	return axios.get(`${API_URL}/vehicle/analyze/distance/${id.toString()}`);
}

export function fetchLoops(id) {
	return axios.get(`${API_URL}/vehicle/analyze/loop/${id.toString()}`);
}

export function fetchSpeedingViolations(id) {
	return axios.get(`${API_URL}/vehicle/analyze/speeding/${id.toString()}`);
}

export function fetchStopViolations(id) {
	return axios.get(`${API_URL}/vehicle/analyze/stop/${id.toString()}`);
}

export function fetchLiveness(id) {
	return axios.get(`${API_URL}/vehicle/analyze/liveness/${id.toString()}`);
}

export function fetchCutOffTime() {
	return axios.get(`${API_URL}/admin/cutofftime}`);
}

export function updateCutOffTime(json) {
	return axios.put(`${API_URL}/admin/cutofftime`, json, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export function fetchNorthboundAccessToken() {
	return axios.get(`${API_URL}/northbound/token`);
}

export function fetchRefreshRoutes(json) {
	return axios.put(`${API_URL}/route/refresh`, json, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export function fetchRefreshParameters(json) {
	return axios.put(`${API_URL}/parameter/refresh`, json, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}