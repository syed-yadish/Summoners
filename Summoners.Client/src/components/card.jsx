import '../styles/card.css';

const Card = ( { data, extraData }) => {
    let rankedData={ summonerName:"", wins:"", losses:"", rank:"", tier:"", leaguePoints:"" };
    for (let i = 0; i < data.length; i++)
    {
        if (data[i].queueType === "RANKED_SOLO_5x5")
        {   rankedData = {...data[i]}
        }
    }

    const wins = parseInt(rankedData.wins);
    const losses = parseInt(rankedData.losses);
    const ratio = (wins /(wins + losses)) * 100;
    const ourRatio = Math.round(ratio * 100) / 100;

    const profileIcon = `http://ddragon.leagueoflegends.com/cdn/12.13.1/img/profileicon/${extraData.profileIconId}.png`

    return (
        <div className='mainCard'> 
            <div className="card green">
            <div className="additional">
                <div className="user-card">
                    <div className='IconDiv'>
                        <img className='Icon' src={profileIcon}/>
                    </div>
                </div>
                <div className="more-info">
                <h1>{extraData.name}</h1>
                <div className="coords">
                    <span className='titlespan'>Rank:</span>
                    <span className='detailspan'>{rankedData.tier || "---"} {rankedData.rank || "---"}</span>
                    <span className='titlespan'>Summoner Level:</span>
                    <span className='detailspan'>{extraData.summonerLevel}</span>
                    <span className='titlespan'>League Points:</span>
                    <span className='detailspan'>{rankedData.leaguePoints || "---"}</span>
                </div>

                <div className="stats">
                    <div>
                    <div className="title">Wins</div>
                    <i className="fa fa-trophy"></i>
                    <div className="value">{rankedData.wins || "---"}</div>
                    </div>
                    <div>
                    <div className="title">Losses</div>
                    <i className="fa fa-gamepad"></i>
                    <div className="value">{rankedData.losses || "---"}</div>
                    </div>
                    <div>
                    <div className="title">Win Ratio</div>
                    <i className="fa fa-group"></i>
                    <div className="value">{ourRatio || "---"}%</div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
    );
}

export default Card;