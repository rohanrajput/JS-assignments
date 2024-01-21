import styles from "../styles/businessCard";

interface Props {
    name: string,
    description: string,
    interests: string[],
    linkedIn: string,
    twitter: string
};

const BusinessCard: React.FC<Props> = ({name, description, interests, linkedIn, twitter}): JSX.Element => {
    return (
        <div style={styles.container}>
            <h1 style={styles.name}>{name}</h1>
            <p>{description}</p>
            <h1>Interests</h1>
            <ul>
                {interests.map((interest, index) => {
                    return <li key={index}>{interest}</li>;
                })}
            </ul>
            <div>
                <button>
                    <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </button>
                <button>
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                </button>
            </div>
        </div>
    );
};

export default BusinessCard;