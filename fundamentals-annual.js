// Annual Plan page - renders blocks and weeks from mock data
document.addEventListener('DOMContentLoaded', function() {
    const blocksSection = document.getElementById('blocksSection');
    const calendarSection = document.getElementById('calendarSection');
    const plan = window.FUNDAMENTALS_ANNUAL_PLAN;
    let currentView = 'grid'; // 'grid' or 'calendar'
    let blockStartDate = null;
    let currentCalendarMonth = null;
    let currentCalendarYear = null;
    
    // Filter state
    let activeFilters = {
        stage: 'all',
        group: 'all',
        player: 'all'
    };

    if (!plan) {
        console.error('FUNDAMENTALS_ANNUAL_PLAN data not found');
        return;
    }

    // Initialize date picker with default date (February 2026 for demo)
    const dateInput = document.getElementById('blockStartDate');
    // Set to February 2, 2026 (Monday) for demo sessions visibility
    const demoStartDate = new Date(2026, 1, 2); // Month is 0-indexed, so 1 = February
    dateInput.value = demoStartDate.toISOString().split('T')[0];
    blockStartDate = new Date(demoStartDate);
    currentCalendarMonth = 1; // February
    currentCalendarYear = 2026;

    // View toggle handlers
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            switchView(view);
        });
    });

    // Date picker handler
    dateInput.addEventListener('change', function() {
        blockStartDate = new Date(this.value);
        // Adjust to Monday if not already
        const dayOfWeek = blockStartDate.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        blockStartDate.setDate(blockStartDate.getDate() + diff);
        dateInput.value = blockStartDate.toISOString().split('T')[0];
        
        if (currentView === 'calendar') {
            currentCalendarMonth = blockStartDate.getMonth();
            currentCalendarYear = blockStartDate.getFullYear();
            renderCalendar();
        }
    });

    // Calendar navigation handlers
    document.getElementById('calendarPrevMonth').addEventListener('click', function() {
        currentCalendarMonth--;
        if (currentCalendarMonth < 0) {
            currentCalendarMonth = 11;
            currentCalendarYear--;
        }
        renderCalendar();
    });

    document.getElementById('calendarNextMonth').addEventListener('click', function() {
        currentCalendarMonth++;
        if (currentCalendarMonth > 11) {
            currentCalendarMonth = 0;
            currentCalendarYear++;
        }
        renderCalendar();
    });

    function switchView(view) {
        currentView = view;
        
        // Update toggle buttons
        document.querySelectorAll('.view-toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-view') === view);
        });
        
        // Show/hide sections
        if (view === 'grid') {
            blocksSection.style.display = 'block';
            calendarSection.style.display = 'none';
        } else {
            blocksSection.style.display = 'none';
            calendarSection.style.display = 'block';
            renderCalendar();
        }
    }

    // Get stage color class
    function getStageColorClass(stage) {
        const stageColors = {
            'fundamentals': 'stage-fundamentals',
            'stage3': 'stage-stage3',
            'stage4': 'stage-stage4'
        };
        return stageColors[stage] || 'stage-fundamentals';
    }

    // Filter sessions based on active filters
    function filterSessions(sessions) {
        return sessions.filter(session => {
            // Stage filter
            if (activeFilters.stage !== 'all' && session.stage !== activeFilters.stage) {
                return false;
            }
            // Group filter
            if (activeFilters.group !== 'all' && session.group !== activeFilters.group) {
                return false;
            }
            // Player filter
            if (activeFilters.player !== 'all' && !session.players.includes(activeFilters.player)) {
                return false;
            }
            return true;
        });
    }

    function renderCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        const monthYearEl = document.getElementById('calendarMonthYear');
        const allSessions = window.CALENDAR_SESSIONS || [];
        
        // Filter sessions
        const sessions = filterSessions(allSessions);
        
        // Set month/year header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
        monthYearEl.textContent = `${monthNames[currentCalendarMonth]} ${currentCalendarYear}`;
        
        // Clear calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const headerCell = document.createElement('div');
            headerCell.className = 'calendar-day-header';
            headerCell.textContent = day;
            calendarGrid.appendChild(headerCell);
        });
        
        // Get first day of month and number of days
        const firstDay = new Date(currentCalendarYear, currentCalendarMonth, 1);
        const lastDay = new Date(currentCalendarYear, currentCalendarMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyCell);
        }
        
        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            
            const currentDate = new Date(currentCalendarYear, currentCalendarMonth, day);
            const dayNumber = document.createElement('div');
            dayNumber.className = 'calendar-day-number';
            dayNumber.textContent = day;
            dayCell.appendChild(dayNumber);
            
            // Check for sessions on this date
            const daySessions = sessions.filter(session => {
                const sessionDate = new Date(session.date);
                return sessionDate.toDateString() === currentDate.toDateString();
            });
            
            // Make day cell droppable
            dayCell.setAttribute('data-date', currentDate.toISOString().split('T')[0]);
            dayCell.addEventListener('dragover', handleDragOver);
            dayCell.addEventListener('drop', handleDrop);
            dayCell.addEventListener('dragenter', handleDragEnter);
            dayCell.addEventListener('dragleave', handleDragLeave);
            
            // Render sessions for this day
            daySessions.forEach(session => {
                const eventPill = createSessionCard(session, currentDate);
                dayCell.appendChild(eventPill);
            });
            
            calendarGrid.appendChild(dayCell);
        }
    }

    // Drag and drop handlers
    let draggedSession = null;
    let draggedElement = null;

    function createSessionCard(session, currentDate) {
        const eventPill = document.createElement('div');
        const stageColorClass = getStageColorClass(session.stage || 'fundamentals');
        const isUnlocked = window.isEventUnlocked && window.isEventUnlocked(session.id);
        
        // Apply locked state if not unlocked
        if (!isUnlocked) {
            eventPill.classList.add('locked');
            eventPill.setAttribute('aria-disabled', 'true');
            eventPill.setAttribute('tabindex', '-1');
            eventPill.setAttribute('title', 'Locked in this demo');
            eventPill.setAttribute('draggable', 'false');
        } else {
            eventPill.setAttribute('draggable', 'true');
        }
        
        eventPill.className = `calendar-event ${session.status} ${stageColorClass}${!isUnlocked ? ' locked' : ''}`;
        eventPill.setAttribute('data-session-id', session.id);
        
        // Format time (convert 17:00 to 5:00 PM)
        const [hours, minutes] = session.time.split(':');
        const hour12 = parseInt(hours) % 12 || 12;
        const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
        const timeDisplay = `${hour12}:${minutes} ${ampm}`;
        
        // Build event content based on status
        let eventContent = '';
        if (session.status === 'completed') {
            eventContent = `
                <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
                    <svg class="calendar-event-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span style="flex: 1;">${session.title}</span>
                </div>
                <span class="calendar-event-time">${timeDisplay}</span>
            `;
        } else if (session.status === 'planned') {
            eventContent = `
                <span>${session.title}</span>
                <span class="calendar-event-time">${timeDisplay}</span>
            `;
        } else if (session.status === 'active') {
            eventContent = `
                <span>${session.title}</span>
                <span class="calendar-event-time">${timeDisplay}</span>
            `;
        } else if (session.status === 'locked') {
            eventContent = `
                <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
                    <svg class="calendar-event-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10M6 10H4C2.89543 10 2 10.8954 2 12V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V12C22 10.8954 21.1046 10 20 10H18M6 10H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span style="flex: 1;">${session.title}</span>
                </div>
                <span class="calendar-event-time">${timeDisplay}</span>
            `;
        }
        
        // Add lock icon badge for locked events (if not already showing lock in content)
        if (!isUnlocked && session.status !== 'locked') {
            eventContent += `
                <div class="calendar-event-lock-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10M6 10H4C2.89543 10 2 10.8954 2 12V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V12C22 10.8954 21.1046 10 20 10H18M6 10H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            `;
        }
        
        eventPill.innerHTML = eventContent;
        
        // Drag event handlers (only for unlocked events)
        if (isUnlocked) {
            eventPill.addEventListener('dragstart', function(e) {
                draggedSession = session;
                draggedElement = this;
                this.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', session.id);
            });
            
            eventPill.addEventListener('dragend', function(e) {
                this.classList.remove('dragging');
                document.querySelectorAll('.calendar-day').forEach(day => {
                    day.classList.remove('drop-zone-active');
                });
            });
        }
        
        // Click handler with lock check
        eventPill.addEventListener('click', function(e) {
            if (!isUnlocked) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            e.stopPropagation();
            
            // Only unlocked active session with route navigates
            if (session.status === 'active' && session.route) {
                window.location.href = session.route;
            } else {
                // For other unlocked sessions, open edit panel
                openSessionEditPanel(session);
            }
        });
        
        // Prevent keyboard activation for locked items
        if (!isUnlocked) {
            eventPill.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        }
        
        return eventPill;
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDragEnter(e) {
        e.preventDefault();
        if (e.currentTarget.classList.contains('calendar-day') && !e.currentTarget.classList.contains('empty')) {
            e.currentTarget.classList.add('drop-zone-active');
        }
    }

    function handleDragLeave(e) {
        if (e.currentTarget.classList.contains('calendar-day')) {
            e.currentTarget.classList.remove('drop-zone-active');
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const dayCell = e.currentTarget;
        dayCell.classList.remove('drop-zone-active');
        
        if (!draggedSession || dayCell.classList.contains('empty')) {
            return;
        }
        
        const newDate = dayCell.getAttribute('data-date');
        if (!newDate) return;
        
        // Add a day to compensate for timezone issues
        const dateObj = new Date(newDate);
        dateObj.setDate(dateObj.getDate() + 1);
        
        // Format as YYYY-MM-DD
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const adjustedDate = `${year}-${month}-${day}`;
        
        // Update session date in mock data
        const sessionIndex = window.CALENDAR_SESSIONS.findIndex(s => s.id === draggedSession.id);
        if (sessionIndex !== -1) {
            window.CALENDAR_SESSIONS[sessionIndex].date = adjustedDate;
            
            // Re-render calendar with animation
            if (draggedElement) {
                draggedElement.style.transition = 'all 0.2s ease';
                draggedElement.style.opacity = '0';
                setTimeout(() => {
                    renderCalendar();
                }, 200);
            } else {
                renderCalendar();
            }
        }
    }

    function openSessionEditPanel(session) {
        const modal = document.getElementById('sessionEditModal');
        const modalTitle = document.getElementById('sessionEditTitle');
        const modalDate = document.getElementById('sessionEditDate');
        const modalTime = document.getElementById('sessionEditTime');
        
        modalTitle.textContent = session.title;
        modalDate.value = session.date;
        modalTime.value = session.time;
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('open');
        }, 10);
        
        // Store current session for updates
        modal.setAttribute('data-session-id', session.id);
    }

    function closeSessionEditPanel() {
        const modal = document.getElementById('sessionEditModal');
        modal.classList.remove('open');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 200);
    }

    // Filter handlers
    function setupFilters() {
        // Stage filter
        const filterStageBtn = document.getElementById('filterStageBtn');
        const filterStageDropdown = document.getElementById('filterStageDropdown');
        const filterStageText = document.getElementById('filterStageText');
        
        filterStageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = filterStageDropdown.style.display === 'block';
            closeAllDropdowns();
            if (!isOpen) {
                filterStageDropdown.style.display = 'block';
            }
        });
        
        filterStageDropdown.querySelectorAll('.filter-option').forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                activeFilters.stage = value;
                filterStageText.textContent = this.textContent;
                filterStageDropdown.style.display = 'none';
                updateFilterButtonState(filterStageBtn, value !== 'all');
                renderCalendar();
            });
        });
        
        // Group filter
        const filterGroupBtn = document.getElementById('filterGroupBtn');
        const filterGroupDropdown = document.getElementById('filterGroupDropdown');
        const filterGroupText = document.getElementById('filterGroupText');
        
        filterGroupBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = filterGroupDropdown.style.display === 'block';
            closeAllDropdowns();
            if (!isOpen) {
                filterGroupDropdown.style.display = 'block';
            }
        });
        
        filterGroupDropdown.querySelectorAll('.filter-option').forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                activeFilters.group = value;
                filterGroupText.textContent = this.textContent;
                filterGroupDropdown.style.display = 'none';
                updateFilterButtonState(filterGroupBtn, value !== 'all');
                renderCalendar();
            });
        });
        
        // Player filter
        const filterPlayerBtn = document.getElementById('filterPlayerBtn');
        const filterPlayerDropdown = document.getElementById('filterPlayerDropdown');
        const filterPlayerText = document.getElementById('filterPlayerText');
        
        filterPlayerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = filterPlayerDropdown.style.display === 'block';
            closeAllDropdowns();
            if (!isOpen) {
                filterPlayerDropdown.style.display = 'block';
            }
        });
        
        filterPlayerDropdown.querySelectorAll('.filter-option').forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                activeFilters.player = value;
                filterPlayerText.textContent = this.textContent;
                filterPlayerDropdown.style.display = 'none';
                updateFilterButtonState(filterPlayerBtn, value !== 'all');
                renderCalendar();
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function() {
            closeAllDropdowns();
        });
    }
    
    function closeAllDropdowns() {
        document.querySelectorAll('.calendar-filter-dropdown').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
    
    function updateFilterButtonState(button, isActive) {
        if (isActive) {
            button.classList.add('filter-active');
        } else {
            button.classList.remove('filter-active');
        }
    }

    // Initialize filters
    setupFilters();

    // Session edit modal handlers
    document.getElementById('sessionEditModalClose').addEventListener('click', closeSessionEditPanel);
    document.getElementById('sessionEditCancelBtn').addEventListener('click', closeSessionEditPanel);
    
    document.getElementById('sessionEditChangeDateBtn').addEventListener('click', function() {
        const modal = document.getElementById('sessionEditModal');
        const sessionId = modal.getAttribute('data-session-id');
        const newDate = document.getElementById('sessionEditDate').value;
        
        if (sessionId && newDate) {
            const sessionIndex = window.CALENDAR_SESSIONS.findIndex(s => s.id === sessionId);
            if (sessionIndex !== -1) {
                window.CALENDAR_SESSIONS[sessionIndex].date = newDate;
                renderCalendar();
                closeSessionEditPanel();
            }
        }
    });
    
    document.getElementById('sessionEditChangeTimeBtn').addEventListener('click', function() {
        const modal = document.getElementById('sessionEditModal');
        const sessionId = modal.getAttribute('data-session-id');
        const newTime = document.getElementById('sessionEditTime').value;
        
        if (sessionId && newTime) {
            const sessionIndex = window.CALENDAR_SESSIONS.findIndex(s => s.id === sessionId);
            if (sessionIndex !== -1) {
                window.CALENDAR_SESSIONS[sessionIndex].time = newTime;
                renderCalendar();
                closeSessionEditPanel();
            }
        }
    });
    
    document.getElementById('sessionEditMarkCompletedBtn').addEventListener('click', function() {
        const modal = document.getElementById('sessionEditModal');
        const sessionId = modal.getAttribute('data-session-id');
        
        if (sessionId) {
            const sessionIndex = window.CALENDAR_SESSIONS.findIndex(s => s.id === sessionId);
            if (sessionIndex !== -1) {
                window.CALENDAR_SESSIONS[sessionIndex].status = 'completed';
                renderCalendar();
                closeSessionEditPanel();
            }
        }
    });
    
    document.getElementById('sessionEditCancelSessionBtn').addEventListener('click', function() {
        const modal = document.getElementById('sessionEditModal');
        const sessionId = modal.getAttribute('data-session-id');
        
        if (sessionId && confirm('Are you sure you want to cancel this session?')) {
            const sessionIndex = window.CALENDAR_SESSIONS.findIndex(s => s.id === sessionId);
            if (sessionIndex !== -1) {
                window.CALENDAR_SESSIONS.splice(sessionIndex, 1);
                renderCalendar();
                closeSessionEditPanel();
            }
        }
    });
    
    // Close modal on overlay click
    document.getElementById('sessionEditModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeSessionEditPanel();
        }
    });

    // Render End-of-Year Outcomes callout
    if (plan.endOfYearGoals) {
        const headerLeft = document.querySelector('.annual-plan-header-left');
        if (headerLeft) {
            const outcomesCallout = document.createElement('div');
            outcomesCallout.className = 'end-of-year-outcomes';
            
            const outcomesTitle = document.createElement('h3');
            outcomesTitle.className = 'end-of-year-outcomes-title';
            outcomesTitle.textContent = `End-of-Year Outcomes (${plan.stageName})`;
            
            const outcomesDesc = document.createElement('p');
            outcomesDesc.className = 'end-of-year-outcomes-description';
            outcomesDesc.textContent = plan.endOfYearGoals.description;
            
            const outcomesList = document.createElement('ul');
            outcomesList.className = 'end-of-year-outcomes-list';
            plan.endOfYearGoals.bullets.forEach(bullet => {
                const li = document.createElement('li');
                li.textContent = bullet;
                outcomesList.appendChild(li);
            });
            
            outcomesCallout.appendChild(outcomesTitle);
            outcomesCallout.appendChild(outcomesDesc);
            outcomesCallout.appendChild(outcomesList);
            
            headerLeft.appendChild(outcomesCallout);
        }
    }

    // Render initial grid view
    plan.blocks.forEach(block => {
        const blockCard = document.createElement('div');
        blockCard.className = `annual-block-card ${block.enabled ? 'enabled' : 'disabled'}`;
        
        const blockHeader = document.createElement('div');
        blockHeader.className = 'annual-block-header';
        
        const blockTitle = document.createElement('h2');
        blockTitle.className = 'annual-block-title';
        const titleText = block.name 
            ? `${block.title.toUpperCase()} — ${block.name.toUpperCase()}`
            : `${block.title.toUpperCase()} • ${block.subtitle}`;
        blockTitle.textContent = titleText;
        
        // Add Weeks subtitle
        const blockSubtitle = document.createElement('div');
        blockSubtitle.className = 'annual-block-subtitle';
        blockSubtitle.textContent = block.subtitle;
        blockHeader.appendChild(blockTitle);
        blockHeader.appendChild(blockSubtitle);
        blockCard.appendChild(blockHeader);
        
        // Render Block Goals if provided
        if (block.blockGoals) {
            const blockGoalsSection = document.createElement('div');
            blockGoalsSection.className = 'block-goals-section';
            
            const blockGoalsDesc = document.createElement('p');
            blockGoalsDesc.className = 'block-goals-description';
            blockGoalsDesc.textContent = block.blockGoals.description;
            
            const prioritiesLabel = document.createElement('span');
            prioritiesLabel.className = 'block-goals-priorities-label';
            prioritiesLabel.textContent = 'Priorities:';
            
            const prioritiesContainer = document.createElement('div');
            prioritiesContainer.className = 'block-goals-priorities';
            
            block.blockGoals.priorities.forEach(priority => {
                const priorityChip = document.createElement('span');
                priorityChip.className = 'block-goals-priority-chip';
                priorityChip.textContent = priority;
                prioritiesContainer.appendChild(priorityChip);
            });
            
            blockGoalsSection.appendChild(blockGoalsDesc);
            blockGoalsSection.appendChild(prioritiesLabel);
            blockGoalsSection.appendChild(prioritiesContainer);
            
            blockCard.appendChild(blockGoalsSection);
        }

        if (block.enabled && block.weeks) {
            const weeksContainer = document.createElement('div');
            weeksContainer.className = 'annual-weeks-container';
            
            block.weeks.forEach(week => {
                const weekCard = document.createElement('div');
                weekCard.className = `annual-week-card ${week.enabled ? 'enabled' : 'disabled'}`;
                if (week.highlight) {
                    weekCard.classList.add('highlighted');
                }
                
                const weekLabel = document.createElement('div');
                weekLabel.className = 'annual-week-label';
                weekLabel.textContent = week.label;
                
                const weekFocus = document.createElement('h3');
                weekFocus.className = 'annual-week-focus';
                weekFocus.textContent = week.focus;
                
                const weekObjectives = document.createElement('ul');
                weekObjectives.className = 'annual-week-objectives';
                week.objectives.forEach(obj => {
                    const li = document.createElement('li');
                    li.textContent = obj;
                    weekObjectives.appendChild(li);
                });
                
                if (week.enabled) {
                    const openButton = document.createElement('button');
                    openButton.className = 'annual-week-open-btn';
                    openButton.textContent = 'Open Week';
                    openButton.addEventListener('click', function(e) {
                        e.stopPropagation();
                        if (week.route) {
                            window.location.href = week.route;
                        }
                    });
                    weekCard.appendChild(openButton);
                } else {
                    const lockIcon = document.createElement('div');
                    lockIcon.className = 'annual-week-lock';
                    lockIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10M6 10H4C2.89543 10 2 10.8954 2 12V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V12C22 10.8954 21.1046 10 20 10H18M6 10H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                    weekCard.appendChild(lockIcon);
                }
                
                weekCard.appendChild(weekLabel);
                weekCard.appendChild(weekFocus);
                weekCard.appendChild(weekObjectives);
                
                weeksContainer.appendChild(weekCard);
            });
            
            blockCard.appendChild(weeksContainer);
        } else {
            const lockMessage = document.createElement('div');
            lockMessage.className = 'annual-block-lock';
            lockMessage.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10M6 10H4C2.89543 10 2 10.8954 2 12V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V12C22 10.8954 21.1046 10 20 10H18M6 10H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><p>This block will be available in future updates.</p>';
            blockCard.appendChild(lockMessage);
        }
        
        blocksSection.appendChild(blockCard);
    });
});
