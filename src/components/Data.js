export default async function getReport() {
    const respond = await fetch('https://hpb.health.gov.lk/api/get-current-statistical');
    const data = await respond.json();
    return {
        data
    }
}