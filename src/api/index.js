import axios from "axios";

const API_URL = "/api";

export function fetchDistance(id) {
	return axios.get(`${API_URL}/distance/${id.toString()}`);
}

export function fetchLiveness(id, formData) {
	return axios.post(`${API_URL}/liveness/${id.toString()}`, formData);
}

export function fetchLoops(trajectoryId, routeId) {
	return axios.get(`${API_URL}/loop/${trajectoryId.toString()}/${routeId.toString()}`);
}

export function fetchSpeedingViolations(id, formData) {
	return axios.post(`${API_URL}/speeding/${id.toString()}`, formData);
}

export function fetchStopViolations(trajectoryId, stopId) {
	return axios.get(`${API_URL}/stop/${trajectoryId.toString()}/${stopId.toString()}`);
}

export function fetchTrajectory(id) {
	return axios.get(`${API_URL}/vehicle/${id.toString()}`);
}

export function fetchRoute(id) {
	return axios.get(`${API_URL}/route/${id.toString()}`);
}

export function fetchStop(id) {
	return axios.get(`${API_URL}/stop/${id.toString()}`);
}

export function fetchTrajectories() {
	return axios.get(`${API_URL}/vehicle`);
}

export function fetchRoutes() {
	return axios.get(`${API_URL}/route`);
}

export function fetchStops() {
	return axios.get(`${API_URL}/stop`);
}

export function postTrajectory(formData) {
	return axios.post(`${API_URL}/vehicle`, formData);
}

export function postRoute(formData) {
	return axios.post(`${API_URL}/route`, formData);
}

export function postStop(data) {
	return axios.post(`${API_URL}/stop`, data);
}

export function updateTrajectory(id, formData) {
	return axios.put(`${API_URL}/vehicle/${id.toString()}`, formData);
}

export function updateRoute(id, formData) {
	return axios.put(`${API_URL}/route/${id.toString()}`, formData);
}

export function updateStop(id, formData) {
	return axios.put(`${API_URL}/stop/${id.toString()}`, formData);
}

export function removeTrajectory(id) {
	return axios.delete(`${API_URL}/vehicle/${id.toString()}`);
}

export function removeRoute(id) {
	return axios.delete(`${API_URL}/route/${id.toString()}`);
}

export function removeStop(id) {
	return axios.delete(`${API_URL}/stop/${id.toString()}`);
}