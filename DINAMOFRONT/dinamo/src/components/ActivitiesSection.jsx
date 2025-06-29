import React from "react";

const ActivitiesSection = ({ activities }) => {
  return (
    <div className="activities-grid">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className={`activity-card ${activity.featured ? "featured-activity" : ""}`}
          style={{ borderTopColor: activity.color }}
        >
          <div className={activity.featured ? "featured-activity-image" : "activity-card-image"}>
            <img src={activity.image} alt={activity.title} />
          </div>

          <div className="activity-card-content">
            <div className="activity-meta">
              <span className="activity-type">{activity.type}</span>
              <span className="activity-duration">{activity.duration}</span>
            </div>
            <h3 className="activity-title">{activity.title}</h3>
            <p className="activity-description">{activity.description}</p>
            <div className="activity-footer">
              <div className="activity-tags">
                {activity.tags.map((tag, i) => (
                  <span key={i} className="activity-tag">{tag}</span>
                ))}
              </div>
              <div className="activity-points">
                <span>+{activity.points} pts</span>
              </div>
            </div>
            <div className="activity-progress">
              <div className="activity-progress-bar">
                <div
                  className="activity-progress-fill"
                  style={{ width: `${activity.progress}%`, backgroundColor: activity.color }}
                />
              </div>
              <span className="activity-progress-text">{activity.progress}% completado</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesSection;
