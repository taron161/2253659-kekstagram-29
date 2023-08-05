const modal = document.querySelector('.big-picture');

const createCommentsFragment = (comments, maxCount, minCount) => {
  const commentsFragment = document.createDocumentFragment();
  const commentsPart = comments.slice(minCount, maxCount);

  commentsPart.forEach(({ avatar, message, name, id }) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');

    const img = document.createElement('img');
    img.alt = name;
    img.src = avatar;
    img.width = 35;
    img.height = 35;
    img.classList.add('social__picture');
    comment.append(img);

    const commentMessage = document.createElement('p');
    commentMessage.classList.add('social__text');
    commentMessage.textContent = message;
    comment.append(commentMessage);

    comment.setAttribute('data-id', id);
    commentsFragment.append(comment);
  });
  return commentsFragment;
};

const addComments = (comments, minCount, maxCount) => {
  if (maxCount > comments.length) {
    maxCount = comments.length;
  }
  const commentContainer = modal.querySelector('.social__comments');
  commentContainer.append(createCommentsFragment(comments, maxCount, minCount));
};

const checkQuantityOfComment = (totalCommentsCount, currentCommentsCount) => {
  const currentCountElement = modal.querySelector('.comments-current');
  const loaderButton = modal.querySelector('.comments-loader');

  if (totalCommentsCount <= currentCommentsCount) {
    currentCommentsCount = totalCommentsCount;
    loaderButton.classList.add('hidden');
  } else if (loaderButton.classList.contains('hidden')) {
    loaderButton.classList.remove('hidden');
  }

  currentCountElement.textContent = currentCommentsCount;
};

export { addComments, checkQuantityOfComment };
