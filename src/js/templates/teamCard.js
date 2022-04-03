const teamList = document.querySelector('.footer__section');

const teamCardMarkup = () => {
  return `
    <div class="team is-hidden showCard">
  <h2 class="gallery-title visually-hidden">Наша команда</h2>
  <ul class="team__list">
    <li class="team__item flip-card">
      <div class="flip-card-inner">
        <div class="team__item-text flip-card-back">
          <h3 class="team__item-name">Aleksandr Sanatar​</h3>
          <p class="team__item-role">Team-lead</p>
        </div>
        <div class="flip-card-front">
          <picture>
            <source srcset="./images/team-images/A_Sanatar.jpg 1x" />
            <img
              class="team__image"
              src="./images/team-images/A_Sanatar.jpg"
              alt="Aleksandr Sanatar"
            />
          </picture>
        </div>
      </div>
    </li>
    <li class="team__item flip-card">
      <div class="flip-card-inner">
        <div class="team__item-text flip-card-back">
          <h3 class="team__item-name">Elena Patlatay</h3>
          <p class="team__item-role">Scrum-master</p>
        </div>
        <div class="flip-card-front">
          <picture>
            <source srcset="./images/team-images/ElenaP.jpg 1x" />
            <img class="team__image" src="./images/team-images/ElenaP.jpg" alt="Elena" />
          </picture>
        </div>
      </div>
    </li>
    <li class="team__item flip-card">
      <div class="flip-card-inner">
        <div class="team__item-text flip-card-back">
          <h3 class="team__item-name">Adrian Tmocaliuc​​</h3>
          <p class="team__item-role">Developer</p>
        </div>
        <div class="flip-card-front">
          <picture>
            <source srcset="./images/team-images/AdrianT.jpg 1x" />
            <img class="team__image" src="./images/team-images/AdrianT.jpg" alt="Adrian" />
          </picture>
        </div>
      </div>
    </li>
    <li class="team__item flip-card">
      <div class="flip-card-inner">
        <div class="team__item-text flip-card-back">
          <h3 class="team__item-name">Selim Fazylov​</h3>
          <p class="team__item-role">Developer</p>
        </div>
        <div class="flip-card-front">
          <picture>
            <source srcset="./images/team-images/foto11.jpg 1x" />
            <img class="team__image" src="./images/team-images/foto11.jpg" alt="Selim Fazylov" />
          </picture>
        </div>
      </div>
    </li>
    <li class="team__item flip-card">
      <div class="flip-card-inner">
        <div class="team__item-text flip-card-back">
          <h3 class="team__item-name">Yevhen Bakhtizin​</h3>
          <p class="team__item-role">Developer</p>
        </div>
        <div class="flip-card-front">
          <picture>
            <source srcset="./images/team-images/EvgenB.jpg 1x" />
            <img class="team__image" src="./images/team-images/EvgenB.jpg" alt="EvgenB" />
          </picture>
        </div>
      </div>
    </li>
    <li class="team__item flip-card">
      <div class="flip-card-inner">
        <div class="team__item-text flip-card-back">
          <h3 class="team__item-name">Oleksii Persatyi​</h3>
          <p class="team__item-role">Developer</p>
        </div>
        <div class="flip-card-front">
          <picture>
            <source srcset="./images/team-images/AlexP.jpg 1x" />
            <img class="team__image" src="./images/team-images/AlexP.jpg" alt="Alex P" />
          </picture>
        </div>
      </div>
    </li>
  </ul>
</div>`;
};

const renderTeamMarkup = () => {
  const markup = teamCardMarkup();
  teamList.insertAdjacentHTML('afterbegin', markup);
};

export default renderTeamMarkup;
