package com.resua.community.infrastructure.output.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id", nullable = false, foreignKey = @ForeignKey(name = "fk_report_comment"))
    private CommentEntity comment;

    @Column(name = "reason", nullable = false, length = 255)
    private String reason;

    @Column(name = "state", nullable = false)
    private Integer state;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}

