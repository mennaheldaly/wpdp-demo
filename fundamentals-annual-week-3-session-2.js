// Session 2 / Lesson Plan page - renders lesson plan with two modes
document.addEventListener('DOMContentLoaded', function() {
    const plan = window.FUNDAMENTALS_ANNUAL_PLAN;
    const videos = window.WPDP_VIDEOS;
    const players = window.WPDP_PLAYERS || [];
    const checklistItems = window.SESSION_CHECKLIST_ITEMS || [];
    const blockerOptions = window.PRIMARY_BLOCKER_OPTIONS || [];
    const blockerVideoMap = window.BLOCKER_VIDEO_MAP || {};
    
    if (!plan || !plan.session2) {
        console.error('Session 2 data not found');
        return;
    }

    const session = plan.session2;
    let currentMode = 'prep'; // 'prep' or 'lesson'
    let currentPlayerId = null;
    
    // Store player progress locally (demo only)
    const playerProgress = {};

    // Set session label and title
    const sessionLabel = document.getElementById('sessionLabel');
    const lessonPlanTitle = document.getElementById('lessonPlanTitle');
    
    // Extract session number from title (e.g., "Session 2 — Contact Point Consistency")
    const sessionMatch = session.title.match(/Session (\d+)/);
    const sessionNumber = sessionMatch ? sessionMatch[1] : '2';
    
    sessionLabel.textContent = `Session ${sessionNumber} • ${session.durationMinutes} min`;
    
    // Extract main title (everything after "— ")
    const titleParts = session.title.split(' — ');
    const mainTitle = titleParts.length > 1 ? titleParts[1] : session.title;
    lessonPlanTitle.textContent = mainTitle;

    // Render Session Flow summary
    function renderSessionFlow() {
        const flowSection = document.getElementById('sessionFlowSection');
        if (!flowSection || !session.sections) return;
        
        // Calculate total duration
        const totalDuration = session.durationMinutes || session.sections.reduce((sum, section) => sum + (section.timeMinutes || 0), 0);
        
        // Create flow container
        const flowContainer = document.createElement('div');
        flowContainer.className = 'session-flow-container';
        
        // Create title
        const flowTitle = document.createElement('h2');
        flowTitle.className = 'session-flow-title';
        flowTitle.textContent = `Session Flow (${totalDuration} min)`;
        flowContainer.appendChild(flowTitle);
        
        // Create blocks container
        const blocksContainer = document.createElement('div');
        blocksContainer.className = 'session-flow-blocks';
        
        // Create block for each section
        session.sections.forEach(section => {
            const block = document.createElement('div');
            block.className = 'session-flow-block';
            
            // Block title
            const blockTitle = document.createElement('div');
            blockTitle.className = 'session-flow-block-title';
            blockTitle.textContent = section.title;
            
            // Time
            const blockTime = document.createElement('div');
            blockTime.className = 'session-flow-block-time';
            blockTime.textContent = `${section.timeMinutes || 0} min`;
            
            // Description (use first drill name if available)
            const blockDesc = document.createElement('div');
            blockDesc.className = 'session-flow-block-description';
            const firstDrill = section.drills && section.drills.length > 0 ? section.drills[0].name : '';
            blockDesc.textContent = firstDrill || '';
            
            block.appendChild(blockTitle);
            block.appendChild(blockTime);
            block.appendChild(blockDesc);
            blocksContainer.appendChild(block);
        });
        
        flowContainer.appendChild(blocksContainer);
        flowSection.appendChild(flowContainer);
    }
    
    renderSessionFlow();

    // Mode toggle handlers
    document.getElementById('prepModeBtn').addEventListener('click', function() {
        currentMode = 'prep';
        updateModeButtons();
        renderContent();
    });

    document.getElementById('lessonModeBtn').addEventListener('click', function() {
        currentMode = 'lesson';
        updateModeButtons();
        renderContent();
    });

    function updateModeButtons() {
        document.getElementById('prepModeBtn').classList.toggle('active', currentMode === 'prep');
        document.getElementById('lessonModeBtn').classList.toggle('active', currentMode === 'lesson');
    }

    function renderContent() {
        const content = document.getElementById('lessonPlanContent');
        content.innerHTML = '';

        if (currentMode === 'prep') {
            renderPreparationMode(content);
        } else {
            renderLessonMode(content);
        }
    }

    function renderPreparationMode(container) {
        session.sections.forEach(section => {
            const sectionCard = document.createElement('div');
            sectionCard.className = 'lesson-plan-section';
            
            const sectionHeader = document.createElement('div');
            sectionHeader.className = 'lesson-plan-section-header';
            sectionHeader.innerHTML = `
                <h2 class="lesson-plan-section-title">${section.title}</h2>
                <span class="lesson-plan-section-time">${section.timeMinutes} min</span>
            `;
            sectionCard.appendChild(sectionHeader);

            section.drills.forEach(drill => {
                const drillCard = document.createElement('div');
                drillCard.className = 'lesson-plan-drill-card';
                
                // Build demonstration video HTML if available (non-clickable placeholder)
                const demoVideoHtml = drill.demonstrationVideo ? `
                    <div class="lesson-plan-drill-demo-video preview-only" data-drill-id="${drill.id}" aria-disabled="true" tabindex="-1">
                        <div class="lesson-plan-demo-video-thumbnail" style="background-image: url('${drill.demonstrationVideo.thumbnailUrl}');">
                            <div class="lesson-plan-demo-video-overlay"></div>
                            <div class="preview-only-label">Preview Only</div>
                            <div class="lesson-plan-demo-video-play-icon">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.95)"/>
                                    <path d="M10 8L16 12L10 16V8Z" fill="#E10600"/>
                                </svg>
                            </div>
                            <div class="lesson-plan-demo-video-title-overlay">
                                <div class="lesson-plan-demo-video-title-text">${drill.demonstrationVideo.title}</div>
                                <div class="lesson-plan-demo-video-duration">${drill.demonstrationVideo.duration}</div>
                            </div>
                        </div>
                    </div>
                ` : '';
                
                drillCard.innerHTML = `
                    <h3 class="lesson-plan-drill-name">${drill.name}</h3>
                    ${demoVideoHtml}
                    <div class="lesson-plan-drill-setup">
                        <strong>Setup:</strong> ${drill.setup}
                    </div>
                    <div class="lesson-plan-drill-cues">
                        <strong>Coaching cues:</strong>
                        <ul>
                            ${drill.cues.map(cue => `<li>${cue}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="lesson-plan-drill-mistake">
                        <strong>Common mistake:</strong> ${drill.commonMistake}
                    </div>
                    <div class="lesson-plan-drill-videos">
                        <strong>Fix common mistakes:</strong>
                        <div class="lesson-plan-video-chips">
                            ${(drill.fixVideos || drill.linkedVideoIds || []).map(videoId => {
                                const video = videos[videoId];
                                if (!video) return '';
                                return `<button class="lesson-plan-video-chip" data-video-id="${videoId}">${video.title}</button>`;
                            }).join('')}
                        </div>
                    </div>
                `;
                
                // Add interaction guards for demonstration video (prevent all interactions)
                const demoVideo = drillCard.querySelector('.lesson-plan-drill-demo-video');
                if (demoVideo && drill.demonstrationVideo) {
                    const blockInteraction = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        return false;
                    };
                    
                    // Block all possible interaction events
                    ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'keydown', 'keyup', 'keypress'].forEach(eventType => {
                        demoVideo.addEventListener(eventType, blockInteraction, true); // Capture phase
                    });
                }
                
                // Add click handlers for fix video chips (open preview modal)
                drillCard.querySelectorAll('.lesson-plan-video-chip').forEach(chip => {
                    chip.addEventListener('click', function() {
                        const videoId = this.getAttribute('data-video-id');
                        const video = videos[videoId];
                        if (video) {
                            openPreviewVideoModal(video.title, this);
                        }
                    });
                });
                
                sectionCard.appendChild(drillCard);
            });
            
            container.appendChild(sectionCard);
        });
    }

    function renderLessonMode(container) {
        const lessonModeContent = document.createElement('div');
        lessonModeContent.className = 'lesson-mode-content';
        
        let totalTime = 0;
        session.sections.forEach(section => {
            const sectionBlock = document.createElement('div');
            sectionBlock.className = 'lesson-mode-section';
            
            const timeDisplay = document.createElement('div');
            timeDisplay.className = 'lesson-mode-time';
            timeDisplay.textContent = `${section.timeMinutes} min`;
            
            const sectionTitle = document.createElement('h2');
            sectionTitle.className = 'lesson-mode-section-title';
            sectionTitle.textContent = section.title;
            
            sectionBlock.appendChild(timeDisplay);
            sectionBlock.appendChild(sectionTitle);
            
            section.drills.forEach(drill => {
                const drillItem = document.createElement('div');
                drillItem.className = 'lesson-mode-drill';
                
                const drillName = document.createElement('h3');
                drillName.className = 'lesson-mode-drill-name';
                drillName.textContent = drill.name;
                
                const drillCue = document.createElement('p');
                drillCue.className = 'lesson-mode-drill-cue';
                drillCue.textContent = drill.cues[0] || '';
                
                drillItem.appendChild(drillName);
                drillItem.appendChild(drillCue);
                sectionBlock.appendChild(drillItem);
            });
            
            lessonModeContent.appendChild(sectionBlock);
            totalTime += section.timeMinutes;
        });
        
        // Add checklist at bottom
        const checklist = document.createElement('div');
        checklist.className = 'lesson-mode-checklist';
        checklist.innerHTML = `
            <h3 class="lesson-mode-checklist-title">Session Checklist</h3>
            <div class="lesson-mode-checklist-items">
                ${session.sections.map((section, index) => `
                    <label class="lesson-mode-checklist-item">
                        <input type="checkbox" class="lesson-mode-checkbox">
                        <span>${section.title}</span>
                    </label>
                `).join('')}
            </div>
        `;
        lessonModeContent.appendChild(checklist);
        
        // Add back to prep mode link (only if not in print modal)
        if (container.id !== 'printPaperContent') {
            const backLink = document.createElement('div');
            backLink.className = 'lesson-mode-back-link';
            backLink.innerHTML = '<a href="#" id="backToPrepLink">← Back to Preparation Mode</a>';
            backLink.querySelector('#backToPrepLink').addEventListener('click', function(e) {
                e.preventDefault();
                currentMode = 'prep';
                updateModeButtons();
                renderContent();
            });
            lessonModeContent.appendChild(backLink);
        }
        
        container.appendChild(lessonModeContent);
    }

    // Print/Export modal handlers
    const printModal = document.getElementById('printModal');
    const printModalBody = document.getElementById('printModalBody');
    const paperStage = document.getElementById('paperStage');
    const printPaper = document.getElementById('printPaper');
    const printPaperContent = document.getElementById('printPaperContent');
    
    // A4 paper dimensions
    const PAPER_W = 794;
    const PAPER_H = 1123;
    
    // Function to calculate and apply scale
    function updatePaperScale() {
        if (!paperStage || !printPaper) return;
        
        const stageRect = paperStage.getBoundingClientRect();
        const stageWidth = stageRect.width;
        const stageHeight = stageRect.height;
        
        // Calculate scale to fit both width and height
        const scaleX = stageWidth / PAPER_W;
        const scaleY = stageHeight / PAPER_H;
        const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down
        
        printPaper.style.transform = `scale(${scale})`;
    }
    
    // ResizeObserver to watch for size changes
    let resizeObserver = null;
    if (window.ResizeObserver) {
        resizeObserver = new ResizeObserver(function() {
            updatePaperScale();
        });
    }
    
    document.getElementById('printExportBtn').addEventListener('click', function() {
        // Render lesson mode in modal
        const tempContainer = document.createElement('div');
        renderLessonMode(tempContainer);
        printPaperContent.innerHTML = tempContainer.innerHTML;
        printModal.style.display = 'flex';
        
        // Remove back link from print preview
        const backLink = printPaperContent.querySelector('.lesson-mode-back-link');
        if (backLink) {
            backLink.remove();
        }
        
        // Calculate and apply scale after content is rendered
        setTimeout(function() {
            updatePaperScale();
            if (resizeObserver && printModalBody) {
                resizeObserver.observe(printModalBody);
            }
        }, 10);
    });
    
    // Also update scale on window resize
    window.addEventListener('resize', function() {
        if (printModal.style.display === 'flex') {
            updatePaperScale();
        }
    });

    document.getElementById('printModalClose').addEventListener('click', function() {
        if (resizeObserver && printModalBody) {
            resizeObserver.unobserve(printModalBody);
        }
        printModal.style.display = 'none';
    });

    document.getElementById('printModalCloseBtn').addEventListener('click', function() {
        if (resizeObserver && printModalBody) {
            resizeObserver.unobserve(printModalBody);
        }
        printModal.style.display = 'none';
    });

    document.getElementById('printModalDownloadBtn').addEventListener('click', function() {
        // No-op for demo
        alert('Download PDF functionality coming soon!');
    });

    document.getElementById('printModalPrintBtn').addEventListener('click', function() {
        // Trigger print - CSS will handle showing only the paper
        window.print();
    });

    // Save button (no-op)
    document.getElementById('saveBtn').addEventListener('click', function() {
        // No-op for demo
        console.log('Save clicked (no-op for demo)');
    });

    // Render players strip
    renderPlayersStrip();
    
    // Add player button handler
    document.getElementById('addPlayerBtn').addEventListener('click', function() {
        // No-op for demo
        alert('Add Player functionality coming soon!');
    });
    
    // Drawer close handlers
    document.getElementById('playerDrawerOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closePlayerDrawer();
        }
    });
    
    document.getElementById('playerDrawerClose').addEventListener('click', function() {
        closePlayerDrawer();
    });
    
    function renderPlayersStrip() {
        const container = document.getElementById('playersStripContainer');
        container.innerHTML = '';
        
        players.forEach(player => {
            const chip = document.createElement('div');
            // Use sessionStatus for chip styling
            const sessionStatus = player.sessionStatus || 'not_assessed';
            chip.className = `player-chip session-${sessionStatus}`;
            chip.setAttribute('data-player-id', player.id);
            
            const statusDot = document.createElement('div');
            statusDot.className = `player-status-dot session-status-${sessionStatus}`;
            
            const playerName = document.createElement('span');
            playerName.className = 'player-name';
            playerName.textContent = player.name;
            
            chip.appendChild(statusDot);
            chip.appendChild(playerName);
            
            chip.addEventListener('click', function() {
                openPlayerDrawer(player.id);
            });
            
            container.appendChild(chip);
        });
    }
    
    function openPlayerDrawer(playerId) {
        currentPlayerId = playerId;
        const player = players.find(p => p.id === playerId);
        if (!player) return;
        
        const drawer = document.getElementById('playerDrawer');
        const overlay = document.getElementById('playerDrawerOverlay');
        const drawerContent = document.getElementById('playerDrawerContent');
        const drawerTitle = document.getElementById('playerDrawerTitle');
        
        drawerTitle.textContent = player.name;
        
        // Get current session status
        const currentSessionStatus = player.sessionStatus || 'not_assessed';
        
        // Status display mapping
        const statusDisplay = {
            'not_assessed': 'Not assessed',
            'on_track': 'On track',
            'needs_support': 'Needs support',
            'struggled': 'Struggled'
        };
        
        // Get existing progress or use player defaults
        const progress = playerProgress[playerId] || {
            sessionResult: currentSessionStatus === 'on_track' ? 'completed' : 
                          currentSessionStatus === 'needs_support' ? 'needs_work' :
                          currentSessionStatus === 'struggled' ? 'struggled' : '',
            checklist: {},
            primaryBlocker: player.blockerTag || ''
        };
        
        // Calculate checklist completion from player data or progress
        const completedCount = Math.round((player.checklistCompletionPct || 0) / 100 * checklistItems.length);
        const totalCount = checklistItems.length;
        
        // Initialize checklist from player data if not in progress
        if (Object.keys(progress.checklist).length === 0) {
            for (let i = 0; i < checklistItems.length; i++) {
                progress.checklist[i] = i < completedCount;
            }
        }
        
        drawerContent.innerHTML = `
            <div class="player-drawer-info">
                <div class="player-drawer-info-item">
                    <span class="player-drawer-info-label">Stage:</span>
                    <span class="player-drawer-info-value">${player.stage}</span>
                </div>
                <div class="player-drawer-info-item">
                    <span class="player-drawer-info-label">Current Week:</span>
                    <span class="player-drawer-info-value">${player.currentWeek}</span>
                </div>
            </div>
            
            <div class="player-drawer-section">
                <h3 class="player-drawer-section-title">Status</h3>
                <div class="player-drawer-status-display">
                    <div class="player-drawer-status-label">Current status:</div>
                    <div class="player-drawer-status-value session-status-${currentSessionStatus}">
                        ${statusDisplay[currentSessionStatus]}
                    </div>
                </div>
                <div class="player-drawer-focus-display">
                    <div class="player-drawer-focus-label">Primary focus:</div>
                    <div class="player-drawer-focus-value">${player.blockerTag || 'None identified'}</div>
                </div>
                <div class="player-drawer-checklist-display">
                    <div class="player-drawer-checklist-label">Checklist completion:</div>
                    <div class="player-drawer-checklist-value">${completedCount}/${totalCount} items</div>
                </div>
            </div>
            
            <div class="player-drawer-section" id="recommendedVideoSection" style="display: none;">
                <h3 class="player-drawer-section-title">Recommended Fix Video</h3>
                <div class="player-drawer-video-card" id="recommendedVideoCard">
                    <!-- Video card will be rendered here dynamically -->
                </div>
            </div>
            
            <div class="player-drawer-section">
                <h3 class="player-drawer-section-title">Checklist</h3>
                <div class="player-drawer-checklist">
                    ${checklistItems.map((item, index) => `
                        <label class="player-drawer-checklist-item">
                            <input type="checkbox" class="player-drawer-checkbox" data-checklist-item="${index}" ${progress.checklist[index] ? 'checked' : ''}>
                            <span>${item}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <div class="player-drawer-section">
                <h3 class="player-drawer-section-title">Assessment</h3>
                <div class="player-drawer-radio-group">
                    <label class="player-drawer-radio">
                        <input type="radio" name="sessionResult" value="completed" ${progress.sessionResult === 'completed' ? 'checked' : ''}>
                        <span>Completed successfully</span>
                    </label>
                    <label class="player-drawer-radio">
                        <input type="radio" name="sessionResult" value="needs_work" ${progress.sessionResult === 'needs_work' ? 'checked' : ''}>
                        <span>Needs more work</span>
                    </label>
                    <label class="player-drawer-radio">
                        <input type="radio" name="sessionResult" value="struggled" ${progress.sessionResult === 'struggled' ? 'checked' : ''}>
                        <span>Struggled significantly</span>
                    </label>
                </div>
            </div>
            
            <div class="player-drawer-section">
                <h3 class="player-drawer-section-title">Primary Blocker</h3>
                <select class="player-drawer-select" id="primaryBlockerSelect">
                    <option value="">Select a blocker...</option>
                    ${blockerOptions.map(option => `
                        <option value="${option}" ${progress.primaryBlocker === option ? 'selected' : ''}>${option}</option>
                    `).join('')}
                </select>
            </div>
            
            <div class="player-drawer-footer">
                <button class="player-drawer-save-btn" id="playerDrawerSaveBtn">Save</button>
            </div>
        `;
        
        // Update recommended video based on current blocker
        updateRecommendedVideo(player.blockerTag);
        
        // Watch for blocker changes
        const blockerSelect = document.getElementById('primaryBlockerSelect');
        blockerSelect.addEventListener('change', function() {
            const selectedBlocker = this.value;
            updateRecommendedVideo(selectedBlocker === 'No blocker' ? null : selectedBlocker);
        });
        
        // Save button handler
        document.getElementById('playerDrawerSaveBtn').addEventListener('click', function() {
            savePlayerProgress(playerId);
        });
        
        function updateRecommendedVideo(blocker) {
            const videoSection = document.getElementById('recommendedVideoSection');
            const videoCard = document.getElementById('recommendedVideoCard');
            
            if (blocker && blockerVideoMap[blocker] && videos[blockerVideoMap[blocker]]) {
                const videoId = blockerVideoMap[blocker];
                const video = videos[videoId];
                
                videoCard.innerHTML = `
                    <div class="player-drawer-video-thumbnail" style="background-image: url('video-thumbnail-1.jpg');">
                        <div class="player-drawer-video-overlay"></div>
                        <div class="preview-only-label">Preview Only</div>
                        <div class="player-drawer-video-play-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.9)"/>
                                <path d="M10 8L16 12L10 16V8Z" fill="#E10600"/>
                            </svg>
                        </div>
                    </div>
                    <div class="player-drawer-video-content">
                        <div class="player-drawer-video-text">
                            <h4 class="player-drawer-video-label">QUICK FIX</h4>
                            <h5 class="player-drawer-video-title">${video.title}</h5>
                        </div>
                        <div class="player-drawer-video-tag">${video.tag}</div>
                    </div>
                `;
                
                videoCard.setAttribute('data-video-id', videoId);
                videoCard.setAttribute('aria-disabled', 'true');
                videoCard.setAttribute('tabindex', '-1');
                videoCard.classList.add('preview-only');
                
                // Add interaction guards
                const blockInteraction = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    return false;
                };
                
                ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'keydown', 'keyup', 'keypress'].forEach(eventType => {
                    videoCard.addEventListener(eventType, blockInteraction, true);
                });
                
                videoSection.style.display = 'block';
            } else {
                videoSection.style.display = 'none';
            }
        }
        
        overlay.style.display = 'flex';
        setTimeout(() => {
            drawer.classList.add('open');
        }, 10);
    }
    
    function closePlayerDrawer() {
        const drawer = document.getElementById('playerDrawer');
        const overlay = document.getElementById('playerDrawerOverlay');
        
        drawer.classList.remove('open');
        setTimeout(() => {
            overlay.style.display = 'none';
            currentPlayerId = null;
        }, 300);
    }
    
    function savePlayerProgress(playerId) {
        const player = players.find(p => p.id === playerId);
        if (!player) return;
        
        // Get form values
        const sessionResult = document.querySelector('input[name="sessionResult"]:checked')?.value || '';
        const checkboxes = document.querySelectorAll('.player-drawer-checkbox');
        const checklist = {};
        checkboxes.forEach(cb => {
            const index = cb.getAttribute('data-checklist-item');
            checklist[index] = cb.checked;
        });
        const primaryBlocker = document.getElementById('primaryBlockerSelect').value;
        
        // Calculate checklist completion percentage
        const completedCount = Object.values(checklist).filter(Boolean).length;
        const checklistCompletionPct = (completedCount / checklistItems.length) * 100;
        
        // Store progress
        playerProgress[playerId] = {
            sessionResult,
            checklist,
            primaryBlocker
        };
        
        // Update player checklist completion
        player.checklistCompletionPct = checklistCompletionPct;
        
        // Map session result to sessionStatus
        let newSessionStatus = 'not_assessed';
        if (sessionResult === 'completed') {
            newSessionStatus = 'on_track';
        } else if (sessionResult === 'needs_work') {
            newSessionStatus = 'needs_support';
        } else if (sessionResult === 'struggled') {
            newSessionStatus = 'struggled';
        }
        
        // Update player sessionStatus
        player.sessionStatus = newSessionStatus;
        
        // Update blockerTag if provided (or set to null if "No blocker")
        if (primaryBlocker) {
            player.blockerTag = primaryBlocker === 'No blocker' ? null : primaryBlocker;
        } else {
            player.blockerTag = null;
        }
        
        // Update players strip to reflect new status
        renderPlayersStrip();
        
        // Close drawer
        closePlayerDrawer();
    }
    
    // Drill video modal handlers
    const drillVideoModal = document.getElementById('drillVideoModal');
    const drillVideoModalClose = document.getElementById('drillVideoModalClose');
    const drillVideoModalPlayer = document.getElementById('drillVideoModalPlayer');
    
    drillVideoModalClose.addEventListener('click', function() {
        closeDrillVideoModal();
    });
    
    drillVideoModal.addEventListener('click', function(e) {
        if (e.target === drillVideoModal || e.target.classList.contains('drill-video-modal-overlay')) {
            closeDrillVideoModal();
        }
    });
    
    function openDrillVideoModal(drill) {
        if (!drill.demonstrationVideo) return;
        
        const modal = document.getElementById('drillVideoModal');
        const title = document.getElementById('drillVideoModalTitle');
        const player = document.getElementById('drillVideoModalPlayer');
        
        title.textContent = drill.demonstrationVideo.title;
        player.src = drill.demonstrationVideo.videoUrl;
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('open');
        }, 10);
    }
    
    // Preview video modal handlers
    const previewVideoModal = document.getElementById('previewVideoModal');
    const previewVideoModalClose = document.getElementById('previewVideoModalClose');
    const previewVideoModalOverlay = document.getElementById('previewVideoModalOverlay');
    let lastFocusedElement = null;
    let focusableElements = null;
    
    // Focus trap functionality
    function trapFocus(modal) {
        focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        function handleTab(e) {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
        
        modal.addEventListener('keydown', handleTab);
        firstElement.focus();
        
        return function cleanup() {
            modal.removeEventListener('keydown', handleTab);
        };
    }
    
    function openPreviewVideoModal(title, clickedElement) {
        const modal = document.getElementById('previewVideoModal');
        const modalTitle = document.getElementById('previewVideoModalTitle');
        
        // Store the clicked element to restore focus later
        lastFocusedElement = clickedElement;
        
        // Set title
        modalTitle.textContent = title;
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus trap
        const cleanup = trapFocus(modal);
        
        // Store cleanup function for later
        modal._focusCleanup = cleanup;
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('open');
        }, 10);
    }
    
    function closePreviewVideoModal() {
        const modal = document.getElementById('previewVideoModal');
        
        // Cleanup focus trap
        if (modal._focusCleanup) {
            modal._focusCleanup();
            modal._focusCleanup = null;
        }
        
        // Animate out
        modal.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
        
        setTimeout(() => {
            modal.style.display = 'none';
            
            // Restore focus to the clicked pill
            if (lastFocusedElement) {
                lastFocusedElement.focus();
                lastFocusedElement = null;
            }
        }, 300);
    }
    
    // Close button handler
    previewVideoModalClose.addEventListener('click', function() {
        closePreviewVideoModal();
    });
    
    // Click outside to close
    previewVideoModal.addEventListener('click', function(e) {
        if (e.target === previewVideoModal || e.target === previewVideoModalOverlay) {
            closePreviewVideoModal();
        }
    });
    
    // Escape key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && previewVideoModal.style.display === 'flex') {
            closePreviewVideoModal();
        }
    });
    
    function closeDrillVideoModal() {
        const modal = document.getElementById('drillVideoModal');
        const player = document.getElementById('drillVideoModalPlayer');
        
        player.pause();
        player.src = '';
        
        modal.classList.remove('open');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    // Initial render
    updateModeButtons();
    renderContent();
});
