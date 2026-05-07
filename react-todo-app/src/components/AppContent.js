import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';
import { clearCompletedTodos } from '../slices/todoSlice';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

function AppContent() {
  const dispatch = useDispatch();

  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  // ✅ Optimized sorting + filtering
  const filteredTodoList = useMemo(() => {
    return [...todoList]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .filter((item) =>
        filterStatus === 'all' ? true : item.status === filterStatus
      );
  }, [todoList, filterStatus]);

  const hasCompleted = useMemo(
    () => todoList.some((todo) => todo.status === 'complete'),
    [todoList]
  );

  // ✅ Stable handler
  const handleClearCompleted = useCallback(() => {
    dispatch(clearCompletedTodos());
  }, [dispatch]);

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Clear Completed Button */}
      {hasCompleted && (
        <div className={styles.clearWrapper}>
          <button
            className={styles.clearButton}
            onClick={handleClearCompleted}
          >
            Clear Completed
          </button>
        </div>
      )}

      <AnimatePresence>
        {filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;