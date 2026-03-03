package com.BugBoard_26.BugBoard_26_backend.repository;

import com.BugBoard_26.BugBoard_26_backend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Tutte le notifiche di un utente, dalla più recente
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);

    // Quante notifiche non lette ha l'utente
    Long countByUserIdAndIsRead(Long userId, boolean isRead);
}
