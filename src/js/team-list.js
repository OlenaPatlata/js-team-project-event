const refs = {
    sectionTeam: document.querySelector('.team'),
    byGOITspan: document.querySelector('.footer__underline'),
    header: document.querySelector('.header'),
    gallery: document.querySelector('.gallery-section'),
    pagination: document.querySelector('.container_pagination'),
    footer: document.querySelector('.footer'),
}


refs.byGOITspan.addEventListener('click', openTeamList);

function openTeamList() {
    refs.sectionTeam.classList.remove('is-hidden');
    refs.byGOITspan.removeEventListener('click', openTeamList);
    refs.byGOITspan.addEventListener('click', closeTeamList);
    refs.gallery.addEventListener('click', closeTeamList);
    refs.header.addEventListener('click', closeTeamList);
    refs.pagination.addEventListener('click', closeTeamList);
}

function closeTeamList() {
    refs.sectionTeam.classList.add('is-hidden');
    refs.byGOITspan.addEventListener('click', openTeamList);
    refs.byGOITspan.removeEventListener('click', closeTeamList);
    refs.gallery.removeEventListener('click', closeTeamList);
    refs.header.removeEventListener('click', closeTeamList);
    refs.pagination.removeEventListener('click', closeTeamList);
}
