export function getRuntime(runtime) {
    const hours = parseInt(runtime / 60);
    const mins = runtime - hours * 60;
    return `${hours}시간 ${mins}분`;
}

export function getReleaseDate(releaseDate) {
    return releaseDate.slice(0, 4);
}
